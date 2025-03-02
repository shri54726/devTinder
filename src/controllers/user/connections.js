const ConnectionRequestModel = require('../../models/connectionRequest')
const SAFE_DATA = 'firstName lastName photoUrl age gender skills'

exports.get = async function(req, res){
    try {
        const user = req.user;

        const connRequest = await ConnectionRequestModel.find({
            $or:[
                {toUserId: user._id, status: 'accepted'},
                {fromUserId: user._id, status: 'accepted'}
            ]
        })
        .populate("fromUserId", SAFE_DATA)
        .populate("toUserId",SAFE_DATA);

        const data = connRequest.map(ele => {
            if(ele.fromUserId._id.toString() === user._id.toString()){
                return ele.toUserId;
            }
            return ele.fromUserId;
        });

        res.send(data);

    } catch (error) {
        res.status(400).send('something went wrong '+error)
    }
}