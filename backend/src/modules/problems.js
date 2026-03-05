const mongoose = require('mongoose')
const {Schema} = mongoose;

const ProblemSchema = new Schema({

    tittle:{
        type:String,
        required:true
    },
    discriptions:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true,
        ennum:['Easy','Medium','Heard']
    },
    tag:{
        type:String,
        required:true,
        ennum:['array','graph','dp','linkedlist']
    },
    visibletestcases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explaination:{
                type:String,
                required:true
            }
        }
    ],
    hiddentestcases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    startcode:[
        {
            language:{
                type:String,
                required:true
            },
            initialcode:{
                type:String,
                required:true
            }
        }
    ],
    problemcreator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})


const problem = mongoose.model("problem",ProblemSchema);

module.exports = problem;