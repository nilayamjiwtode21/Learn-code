//validator function

const validator = require('validator')

const validate = (data)=>{

    const mandatoryfield = ['firstname','emailId', 'password']

    const isAllowed = mandatoryfield.every((k)=>Object.keys(data).includes(k));
                                            //object.keys => data me jo bhi objects hote hai uske keys ka array banata hai

    if(!isAllowed)
        throw new Error('Field is missing');
    if(!validator.isEmail(data.emailId))
        throw new Error("not valid email");
    if(!validator.isStrongPassword(data.password))
        throw new Error('not strong password');

}

module.exports = validate;