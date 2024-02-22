const isLogin = async(req,res,next)=>{
    try{
        if(req.session.user_id){}
        else{
            res.redirect('/admin')
        }
        next()
    }catch(erorr) {
        console.log(erorr.message)
    }
}

const isLogout= async(req,res,next)=>{
    try{

        if(req.session.user_id){
            res.redirect('/admin/home')
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