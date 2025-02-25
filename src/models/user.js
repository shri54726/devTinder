const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('This Email is not Valid => '+value)
            }
        }
    },
    password:{
        type:String,
        minLength: 8,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Please enter strong password => '+value);
            }
        }
    },
    age:{
        type:String,
        min: 18
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error('gender data is invalid');
            }
        }
    },
    photoUrl:{
        type: String,
        default: "https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid url => '+value);
            }
        }
    },
    about:{
        type: String,
        default:'Default value of user'
    },
    skills:{
        type:[String]
    }
},{timestamps:true});

UserSchema.methods.getJWT = async function(){
    try {
        const user = this;
        const option = {
            expiresIn: '1h'
        }
    
        const token = await jwt.sign({_id: user._id},'test_key',option);
    
        return token;
    } catch (error) {
        throw new Error('token not created');
    }
}

UserSchema.methods.validatePassword = function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPassValid = bcrypt.compare(passwordInputByUser, user.password);
    return isPassValid;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;