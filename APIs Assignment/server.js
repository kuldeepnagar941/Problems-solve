const express = require('express');
const mongoose = require('mongoose');
const app= express();
const port = 3000


const mongoUrl='mongodb+srv://kuldeep:1234@cluster0.nfpokzo.mongodb.net/RestfulAPI_Assignment'
mongoose.connect(mongoUrl)
.then(()=>{
    console.log("MONGODB CONNECTED SUCCSESFULLY")
})
.catch((err)=>{
    console.log("mongodb connecting ERROR")
    
})



const userRoutes =require('./routes/userRoutes')
app.use('/user',userRoutes)

const taskRoutes =require('./routes/taskRoutes')
app.use('/task',taskRoutes)

const productRoutes = require('./routes/productRoutes')
app.use('/teacher',productRoutes)





app.listen(port,()=>{
    console.log(`PORT IS LISTON ON PORT :${port}`)
})
