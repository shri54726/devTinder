const mongoose = require('mongoose');

const connectDB = async ()=>{
    mongoose.connect(
        "mongodb://0.0.0.0:27017/devTinder"
    )
}

module.exports = connectDB;