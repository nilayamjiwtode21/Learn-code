//checking the info. given by the user like first name, password , email

const redisClient = require('../config/redis');
const User = require('../modules/users');
const validate = require('../utils/validtors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req,res)=>{

    //validat the info.
    validate(req.body);

    try{

        const {firstname,emailId,password } = req.body;

        //check if email already exist
        //const ans = User.exists({emailId});

        req.body.password = await bcrypt.hash(password,10);
        req.body.role = "user";

        const user = await User.create(req.body);

        const token = jwt.sign({_id:user._id , emailId:emailId , role:user.role},process.env.JWT_KEY, {expiresIn: 60*60})
         //command to genarate ramdom JWT private key => 7583d8f0eb63c2a6529e6b73a850dfc2e40c3cea4a92c30d95d3ce3d7dcec2b3
                   
              //cookie name , token value
         res.cookie('token',token,{maxAge: 60*60*1000});

         res.status(201).send("user registered successfully");

    }
    catch(err){

        res.status(400).send('error: '+ err);
    }
}


const login = async (req,res)=>{
     
    const {emailId, password} = req.body;

    try{

        if(!emailId)
          throw new Error('invalid credantials');

        if(!password)
          throw new Error('invalid credantials');

        const user = await User.findOne({emailId});

        const match = await bcrypt.compare(password , user.password)

        if(!match)
            throw new Error("invalid credantials");

        const token = jwt.sign({_id:user._id , emailId:emailId , role:user.role},process.env.JWT_KEY, {expiresIn: 60*60})
         res.cookie('token',token,{maxAge: 60*60*1000});
         res.status(200).send('logged in Successfully');

    }
    catch(err){

        res.status(401).send('error: '+err);

    }
 

}

const logout = async (req,res)=>{
    
    try{

        const {token} = req.cookies;

        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`, 'blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);

        res.cookie("token",null,{expires:new Date(Date.now())});
        res.status(200).send("logged out successfully");
    }
    catch(err){

        res.status(503).send("error"+err);
    }
}

const adminRegistration = async(req,res)=>{

     //validat the info.
    validate(req.body);

    try{

        const {firstname,emailId,password } = req.body;

        //check if email already exist
        //const ans = User.exists({emailId});

        req.body.password = await bcrypt.hash(password,10);
        req.body.role = "admin";

        const user = await User.create(req.body);

        const token = jwt.sign({_id:user._id , emailId:emailId , role:user.role},process.env.JWT_KEY, {expiresIn: 60*60})
         //command to genarate ramdom JWT private key => 7583d8f0eb63c2a6529e6b73a850dfc2e40c3cea4a92c30d95d3ce3d7dcec2b3
                   
              //cookie name , token value
         res.cookie('token',token,{maxAge: 60*60*1000});

         res.status(201).send("user registered successfully");

    }
    catch(err){

        res.status(400).send('error: '+ err);
    }
}

module.exports = {register,login,logout,adminRegistration};