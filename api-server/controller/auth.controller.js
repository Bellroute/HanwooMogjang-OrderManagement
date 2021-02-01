const authService = require('../service/auth.service');

const login = async (req, res) => {
  try {
    token = await authService.login(req.body);
    if (token !== null) {
      return res.status(200).json({
        token: token
      });
    }
    return res.status(400).json({
      message: '로그인 정보를 잘못 입력하셨습니다.'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

module.exports = {
  login
};
