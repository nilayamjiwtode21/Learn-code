const { config } = require('dotenv');
const express = require('express');
const app = express();
require('dotenv').config()
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouths = require('./routes/userAuth');

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouths);

main()
.then(async ()=>{
    app.listen(process.env.PORT, ()=>{
    console.log("server listing at port :" + process.env.PORT)
    })
})
.catch(err=> console.log("error occured: "+ err));