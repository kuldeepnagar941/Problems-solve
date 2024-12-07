const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv').config()
const mongoUrl = process.env.MONGO_URI
const PORT = process.env.PORT ||4000
const userRoutes = require('./routes/user')
app.use(cors());
app.use(express.json())



mongoose.connect(mongoUrl)
.then(()=>{
    console.log('>>>>>>>Connected to MongoDB')
})
.catch((err)=>{
    console.log('>>>>>>>Error connecting to MongoDB')
});






app.use('/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})