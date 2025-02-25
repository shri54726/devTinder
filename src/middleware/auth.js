const jwt = require('jsonwebtoken');
const User = require('../models/user')


const userAuth  = async(req, res, next)=>{
    try {
        // Read the token from req.
        const { token } = req.cookies;

        if(!token){
            throw new Error('Invalid Token')
        }

        //Verify The token
        const decodedToken = await jwt.verify(token, 'test_key')

        const user = await User.findById({_id: decodedToken._id})
        if(!user){
            throw new Error('User Not Found');
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(400).send('Error: '+ error.message);
    }
}

module.exports = { userAuth };