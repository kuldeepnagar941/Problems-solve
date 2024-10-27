const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true, versionKey: false })


module.exports = mongoose.model("users",userSchema)