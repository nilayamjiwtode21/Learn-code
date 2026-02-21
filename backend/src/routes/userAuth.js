const express = require('express');
const authRouths = express.Router();

//register
authRouths.post('/register', register);
authRouths.post('login', login);
authRouths.post('logout', logout);
authRouths.get('getProfile', getProfile);


