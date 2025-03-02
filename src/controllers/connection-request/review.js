const connectionRequest = require('../../models/connectionRequest');

exports.post = async function(req, res){
    try {
        const user = req.user;
        const {status, requestId} = req.query;

        //Status validation
        if(!['accepted','rejected'].includes(status)){
            return res.status(400).send('Invalid Stats: '+status);
        }

        //request id should be valid
        const requestDetails = await connectionRequest.findOne({
            _id: requestId,
            toUserId: user._id,
            status: 'interested'
        });
        if(!requestDetails){
            return res.status(400).send('Request Not Found');
        }

        requestDetails.status = status;

        data = await requestDetails.save()
        
        res.send('Request '+status);
    } catch (error) {
        res.status(400).send('Something went wrong: '+error.message);
    }
}