const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    dateOfBirth:{
        type:Date,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type: String,
        default: "user"
    },
   
      createdAt: {
        type: Date,
        default: Date.now 
      }

} ,{timestamps:true,versionKey:false})

module.exports = mongoose.model('user',userSchema)