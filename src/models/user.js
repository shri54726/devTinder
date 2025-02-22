const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
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

const User = mongoose.model('User', UserSchema);
module.exports = User;