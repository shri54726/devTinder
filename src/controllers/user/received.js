const connectionRequest = require('../../models/connectionRequest')

exports.get = async function (req, res) {
    try {
        const user = req.user;

        const connectionList = await connectionRequest.find({
            toUserId: user._id,
            status: 'interested'
        }).populate("fromUserId", ['firstName', 'lastName']);
    
        res.send(connectionList)
    } catch (error) {
        res.status(400).send('Something went wrong: '+ error.message); 
    }
} 
