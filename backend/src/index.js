const { config } = require('dotenv');
const express = require('express');
const app = express();
require('dotenv').config()
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouths = require('./routes/userAuth');
const redisClient = require('./config/redis');

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouths);


//conecting both mongodb and redis server ak same time
const InitializeConnection = async ()=>{

    try{
             //promiss.all se haam aksath 2 db ko connect kar sakte hai, nahi to hame ak baar ak hii db ko connect karna padta hai
        await Promise.all([main(),redisClient.connect()])

        app.listen(process.env.PORT, ()=>{
            console.log("server listing at port :" + process.env.PORT)
            })


    }
    catch(err){
        console.log("error occured" + err);
    }
}

InitializeConnection();



//conecting only mongodb server
// main()
// .then(async ()=>{
//     app.listen(process.env.PORT, ()=>{
//     console.log("server listing at port :" + process.env.PORT)
//     })
// })
// .catch(err=> console.log("error occured: "+ err));