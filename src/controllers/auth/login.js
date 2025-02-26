const validator = require('validator');
const User = require('../../models/user')

exports.post = async function (req, res){
    try {
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error('Invalid credentials');
        }
        const isUserAvailable = await User.findOne({emailId:emailId});

        if(!isUserAvailable){
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await isUserAvailable.validatePassword(password)
        if(!isValidPassword){
            throw new Error('Invalid credentials');
        }  

        const token = await isUserAvailable.getJWT();

        res.cookie('token', token,{ expires: new Date(Date.now() + 1 + 900000)})
        res.send("You have been logged in...");

    } catch (error) {
        res.status(400).send('somthing went wrong: '+error);
    }
}