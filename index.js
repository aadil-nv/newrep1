const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")
const express=require('express')
const app=express()

//for user route
const userRoute=require('./routes/userRoute')
app.use('/',userRoute)

// For Admin Route
const adminRoute=require('./routes/adminRoute')
app.use('/admin',adminRoute)



app.listen(3001,()=>{
    console.log("server has started on http://localhost:3001")
})

