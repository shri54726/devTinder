const ConnectionRequestModel = require('../../models/connectionRequest')
const User = require('../../models/user')

exports.post = async function(req, res){
    try {
        const fromUserId = req.user._id;
        const toUserId = req.query.toUserId;
        const status = req.query.status;
        let message;

        // same code is available in models/connectionRequest
        if(fromUserId.equals(toUserId)){
            return res.status(400).send('From and To user ID should not be same')
        }

        const isUserAvailable = await User.findById(toUserId);
        if(!isUserAvailable){
            return res.status(400).send('The user is not available.')
        }

        if(!['interested','ignored'].includes(status)){
            return res.status(400).send('Invalid Stats: '+status);
        }

        // check if connection is already present
        const exesistingRequest = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ],
            status: status
        });

        if(!!exesistingRequest){
            return res.status(400).send("A connection request is already present...");
        }

        const connectRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = connectRequest.save()
        status === 'interested' ? message=req.user.firstName+' has shown interest in '+ isUserAvailable.firstName :
        message = req.user.firstName+' has ignored '+ isUserAvailable.firstName
        res.json({message: message, data:data})
        
    } catch (error) {
        res.status(400).send('Something went wrong '+ error.message)
    }
}