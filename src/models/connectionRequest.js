const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: '{VALUE} is incorrect status'
        }
    }
    },
    {
        timestamps: true
    }
);


connectionRequestSchema.index({fromUserId: 1, toUserId: 1});


connectionRequestSchema.pre('save', function(next){
    const connectionRequest = this;

    // check if user id are equal
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('Cannot send connection request to youeself')
    }
    next();
});

const ConnectionRequestModel = mongoose.model("ConnectionRequestModel", connectionRequestSchema)
module.exports = ConnectionRequestModel;