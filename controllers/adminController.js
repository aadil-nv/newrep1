const User = require('../models/userModel')
const bcrypt= require('bcrypt')
const randomstring=require('randomstring')

const securePassword = async(password)=>{
    try{
        const passwordHash =await bcrypt.hash(password,10)
        return passwordHash
    } catch (erorr){
        console.log(erorr.message)
    }
}



const loadLogin= async (req,res)=>{
    try {
        res.render('login')
    }catch (erorr){
        console.log(erorr.message)
    }
}
const verifyLogin= async (req,res)=>{
    try{
        const email = req.body.email
        const password= req.body.password

        const userData=await User.findOne({email:email})
        if(userData){
         const passwordMatch=await   bcrypt.compare(password,userData.password)
            if(passwordMatch){
                if(userData.is_admin=== 0){
                res.render('login',({message:"Email and Password is Incorrect"}))
                }else{
                    req.session.user_id=userData._id
                    res.redirect('/admin/home')
                }
            }else{
                res.render('login',({message:"Email and Password is Incorrect"})) 
            }

        }
        else{
            res.render('login',({message:"Email and Password is Incorrect"}))
        }
    }catch(erorr){
        console.log(erorr.message)
    }
}

const loadDashBoard = async (req,res)=>{
    try{
        const userData=await User.findById({_id:req.session.user_id})
        res.render('home',{admin:userData})

    }catch (erorr){
        console.log(erorr.message)
    }
}
const logout = async (req,res)=>{
    try{
        req.session.destroy()
        res.redirect('/admin')

    }catch (erorr){
        console.log(erorr.message)
    }
}
const adminDashboard = async (req,res)=>{
    try{
        const usersData=await User.find({is_admin:0})
       
        res.render('dashboard',{users:usersData})

    }catch (erorr){
        console.log(erorr.message)
    }
}

// Add new work started

const newUserLoad = async (req,res)=>{
    try{
               
        res.render('new-user')

    }catch (erorr){
        console.log(erorr.message)
    }
}

const addUser = async (req,res)=>{
    try{
               
        const name=req.body.name
        const email=req.body.email
        const mno=req.body.mno
        const password=randomstring.generate(8)

        const spassword=await securePassword(password)

        const user= new User({
            name:name,
            email:email,
            mobile:mno,
            password:spassword,
            is_admin:0
        })
        
        const userData = await user.save()

        if(userData){

            res.redirect('/admin/dashbaord')
        }else{
            res.render('new-user',{message:"something wrong"})
        }

    }catch (erorr){
        console.log(erorr.message)
    }
}

// edit user functionalties
const editUserLoad = async (req,res)=>{
    try{
          const id=req.query.id
          const userData= await User.findById({_id:id}) 
          if(userData){
            res.render('edit-user',{user:userData})
          }else{
            res.redirect('/admin/dashboard')
          }    
        

    }catch (erorr){
        console.log(erorr.message)
    }
}

const updateUsers = async (req,res)=>{
    try{
               
      const userData=await  User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno,is_verified:req.body.verify}})
        res.redirect('/admin/dashboard')
    }catch (erorr){
        console.log(erorr.message)
    }
}

// dlete users
const deleteUser = async (req,res)=>{
    try{
               
        const id =req.query.id
        await User.deleteOne({_id:id})
        res.redirect('/admin/dashboard')

    }catch (erorr){
        console.log(erorr.message)
    }
}



module.exports= {
    loadLogin,
    verifyLogin,
    loadDashBoard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUsers,
    deleteUser
    

}