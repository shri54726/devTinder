const mongoose = require('mongoose');

const connectDB = async ()=>{
    mongoose.connect(
        "mongodb+srv://dev-tinder-user:QgPLeSYCVFlHSUHz@cluster0.z54it.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
}

module.exports = connectDB;