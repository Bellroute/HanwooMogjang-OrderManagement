const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller');

// 로그인
// POST /api/auth/login
router.post('/login', AuthController.login);

module.exports = router;
