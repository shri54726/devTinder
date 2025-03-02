const ConnectionRequestModel = require('../../models/connectionRequest');
const User = require('../../models/user');
const SAFE_DATA = 'firstName lastName photoUrl age gender skills'
exports.get = async function (req, res) {
    try {
        const user = req.user;
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;
        const connectRequest = await ConnectionRequestModel.find({
            $or: [{fromUserId: user._id},{toUserId: user._id}]
        })
        .select("toUserId fromUserId")

        const hideFromFeed = new Set();

        connectRequest.forEach(ele=>{
            hideFromFeed.add(ele.fromUserId.toString())
            hideFromFeed.add(ele.toUserId.toString())
        })        

        const userList = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideFromFeed)}},
                {_id: {$ne: user._id}}
            ]
        }).select(SAFE_DATA).skip(skip).limit(limit);

        res.send(userList)
    } catch (error) {
        res.status(400).send('somthing went wrong '+ error)
    }
}