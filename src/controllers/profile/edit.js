const { validateProfileEdit } = require('../../utils/validations')

exports.post = async function(req, res){
    try {
        if(!validateProfileEdit(req)){
            throw new Error('Invalid Edit Request');
        }

        const user = req.user;

        Object.keys(req.body).forEach(ele=>user[ele] = req.body[ele]);

        await user.save();
         
        console.log(user);

        res.send(`${user.firstName} your profile updated successfully!!`)

    } catch (error) {
        res.status(400).send('somthing went wrong: '+error);
    }
}