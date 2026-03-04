const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");
const User = require('../modules/users')

//validating the token given by the user in redis db
const adminMiddleware = async (req,res,next) =>{

    try{
        const {token} = req.cookies;

        if(!token)
            throw new Error("Invalid Token");

        const payload = jwt.verify(token, process.env.JWT_KEY)

        const {_id} = payload;

        if(!_id)
            throw new Error("Id not found")

        const result = await User.findById(_id);

        if(payload.role!="admin")
            throw new Error("Not Admin")

        if(!result)
            throw new Error("user dons't exsit");

        
         //checking if token exsits in blocklist of redis database,
        const Isblocked = await redisClient.exists(`token:${token}`);

        if(Isblocked)
            throw new Error("Invalid token");

        req.result = result;

        next();

    }

    catch(err){

        res.status(401).send("error occured"+err);
    }
}


module.exports = adminMiddleware;