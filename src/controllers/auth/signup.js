const { validateSignUp } = require('../../utils/validations')
const User = require('../../models/user')
const bcrypt = require('bcrypt')

exports.post = async function (req,res){
    try {
        // Validate Data
        validateSignUp(req.body);

        // Encrypt Password
        const {firstName, lastName, emailId, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: hashPassword
        });
    
        await user.save();
    
        res.send('User Added Successfully');
    } catch (error) {
        res.status(400).send("Error while saving "+ error )
    }
}