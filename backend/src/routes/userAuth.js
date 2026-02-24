const express = require('express');
const authRouths = express.Router();
const {register,login,logout} = require('../controllers/userAuthen')

//register
authRouths.post('/register', register);
authRouths.post('/login', login);
authRouths.post('/logout', logout);
//authRouths.get('getProfile', getProfile);

module.exports = authRouths;
