const User=require('../models/userModel')
const bcrypt=require('bcrypt')



const securedPassword = async(password)=>{
    try{
        const passwordHash =await bcrypt.hash(password,10)
        return passwordHash
    } catch (erorr){
        console.log(erorr.message)
    }
}

const loadRegister=async(req,res)=>{
    try{
        res.render('registration')
    }catch (erorr){
        console.log(erorr.message)
    }
}

const insertUser= async(req,res)=>{
    try{
        const spassword= await securedPassword(req.body.password)

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mno,
            password:spassword,
            is_admin:0,
           
        })
        const userData= await user.save()

        if(userData){
            res.render('registration',{message:"Succesfilly Registerd Your Form . Please Verify Your Mail"})
        }else{
           res.render('registration',{message:"Your Registration has been Failed "})

        }
    }catch (erorr){
        console.log(erorr.message)
    }
}

//login user methods started

const loginLoad = async(req,res)=>{
    try{
        res.render('login')
    }catch (erorr){
        console.log(erorr.message)
    }
}

// login veryfying
const verifyLogin =async(req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password
        const userData=await  User.findOne({email:email})
        console.log(email)

        if(userData){
            const passwordMatch=await bcrypt.compare(password,userData.password)
            if(passwordMatch){
                if(userData.is_verified===0){
                    res.render('login',{message:"please verify your mail"})
                }else{
                    req.session.user_id=userData._id
                    res.redirect('/home')
                }
            }else{
                
                res.render('login',{message:"Email and password incorrect"})
               
            }
        }else{
            res.render('login',{message:"Email and password incorrect"})
        }
    }catch (erorr){
        console.log(erorr.message)
    }
}

// load home

const loadHome = async(req,res)=>{
    try{
        const userData=await User.findById({_id:req.session.user_id})
        res.render('home',{user:userData})

    }catch (erorr){
        console.log(erorr.message)
    }
}

const userLogout = async(req,res)=>{
    try{
        req.session.destroy()
        res.redirect('/')

    }catch (erorr){
        console.log(erorr.message)
    }
}

// const searchUser= async(req,res)=>{
//     try{
//         let searchname= req.body.name
//         let searchedName= await User.findOne({name:searchname})
//         if(searchedName){
//             res.send("name has found")
//         }else{
//             res.send("not found")
//         }

//     }catch (erorr){
//         console.log(erorr.message)
//     }
// }

const searchUser= async (req,res)=>{
    try{
        let searchname=req.body.name
        let searchedName= await User.findOne({name:searchname})
        if(searchedName){
            res.send("name found")
        }else{
            res.send("not found")
        }

    }catch(erorr){
        console.log(erorr.message)
    }
}
module.exports={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    searchUser
}