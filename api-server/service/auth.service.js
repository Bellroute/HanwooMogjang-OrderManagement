const mongoose = require('mongoose');
var User = require('../model/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async data => {
  try {
    var user = await User.findByUsername(data.username, function(error, user) {
      if (error) {
        console.log(error);
      } else {
        user;
      }
    });

    console.log(process.env.USER_PASSWORD_SECRET);

    const hash = crypto
      .createHmac('sha256', process.env.USER_PASSWORD_SECRET)
      .update(data.password)
      .digest('base64');

    if (user.password === hash) {
      let jwt_secret = process.env.JWT_SECRET;

      const getToken = new Promise((resolve, reject) => {
        jwt.sign(
          {
            id: User.user_id,
            role: User.user_role
          },
          jwt_secret,
          {
            expiresIn: '1m',
            subject: 'userInfo'
          },
          (err, token) => {
            if (err) reject(err);
            resolve(token);
          }
        );
      });

      return getToken;
    }
    return null;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  login
};
