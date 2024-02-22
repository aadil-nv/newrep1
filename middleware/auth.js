const isLogin= async(req,res,next)=>{
    try {
        if(req.session.user_id){}
        else{
            res.redirect('/')
        }
        next()
    }catch (erorr){
        console.log(erorr.messagekk)
    }
}

const isLogout= async(req,res,next)=>{
    try{
        if(req.session.user_id){
            res.redirect('/home')
        }
        next()

    }catch(erorr){
        console.log(erorr.message)
    }
}

module.exports={
    isLogin,
    isLogout
}