const validator = require('validator');

const validateSignUp = (req)=>{
    const {firstName, lastName, emailId, password} = req;
    if(!firstName || !lastName){
        throw new Error('Name is not valid!');
    }else if(!validator.isEmail(emailId)){
        throw new Error('Enter Valid Email')
    }else if(!validator.isStrongPassword(password)){
        throw new Error('Enter Strong Password')
    }
}



module.exports = {validateSignUp};