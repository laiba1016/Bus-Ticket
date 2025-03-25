const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const authModel = require('../Models/Auth');
const { register, login, forgotPassword, resetPassword } = require('../Controllers/Auth');
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
