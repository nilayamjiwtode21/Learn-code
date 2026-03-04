const express = require('express');
const authRouths = express.Router();
const {register,login,logout,adminRegistration} = require('../controllers/userAuthen')
const userMiddleware = require('../middleware/usermiddleware')
const adminMiddleware = require('../middleware/adminMiddleware');

//register
authRouths.post('/register', register);
authRouths.post('/login', login);
authRouths.post('/logout', userMiddleware,logout);
authRouths.post('/adminRegistration',adminMiddleware,adminRegistration);
//authRouths.get('getProfile', getProfile);

module.exports = authRouths;
