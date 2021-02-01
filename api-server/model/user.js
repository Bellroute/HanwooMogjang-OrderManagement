const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.statics.findByUsername = async function(username) {
  return await this.findOne({ username: username });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
