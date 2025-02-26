const User = require('../../models/user');
const bcrypt = require('bcrypt')

exports.post = async function(req, res){
    try {
        const user = req.user;
        const userDetails = await User.findById({_id: user._id});
        const isValidPassword = await userDetails.validatePassword(req.body.oldPassword)
        if(!isValidPassword){
            throw new Error('invalid password');
        }

        const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
        userDetails.password = hashPassword;

        userDetails.save();

        res.send('Password updated successfully!!');

    } catch (error) {
        res.status(400).send('Something went wrong '+error.message);
    }
}