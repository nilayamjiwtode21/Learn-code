const mongoose = require('mongoose');
const { Schema } = mongoose;

const userschema = new Schema({
    firstname:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    LastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        immutable:true,
        lowercase:true
    },
    age:{
        type:Number,
        min:6,
        max:70
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    Problemsolved:{
        type:Number
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const User = mongoose.model("user", userschema);

module.exports = User;