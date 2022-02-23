const User =require('../../model/admin')
const Query =require('../../model/Query')
const jwt =require('jsonwebtoken')

const  adminSecretKey ="ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"
const  {validationResult} = require('express-validator');




exports.adminLogInpage =(req,res,next)=>{
     res.render('ADmin/login')

 }

exports.login =async(req,res,next)=>{
     try{ 

          const errors =validationResult(req)
          var message;
          if(!errors.isEmpty()){
                message =errors.array()
          }

           const {email,password} =req.body
           if(!email || !password){
              res
                .statusS(400)
                 .json({
                       message:'please provide the email && password',
                       satusCode:400
                   })
           }
           console.log(email,password)
           const user =await User.findOne(
                {
                    $and:[
                         {email:email},
                         {role:'admin'}
                         ]
                }).select('+Password')
           const correct = await user.correctPassword(password,user.Password)
           if(correct==true){
               var token = jwt.sign({
                   userId:user.id
              },adminSecretKey,{ expiresIn :'1h' })
                 
              // res
              //      .status(202)
              //      .json({
              //           statuscode:202,
              //           message:"User Login scucessfuly Login SucessFully",
              //           user,
              //           token
              // } )  
                 res.cookie('jwt',token,{ httpOnly: true, secure: true, maxAge: 3600000 })
                  res.redirect('/api/adminDashboard/')
           }else{
                res.status(401).json({
                     satusCode:401,
                     message:'Incorrect the email && password',
                })
           }
     }catch(err){
        res.render('ADmin/login',{
             message:message
        })
     }
}




exports.DashBoard=async(req,res,next)=>{
     const user = await User.find({role:'user'})
     const query = await Query.find()
     const TotalUser =user.length
     const TotalQuery =query.length
     res.render('ADmin/admin_panel',{
       user:TotalUser,
       query:TotalQuery
     })
}




exports.getAllUserDetails =async(req,res,next)=>{
     try{
          const user = await User.find({role:'user'})
            res.render('ADmin/userList',{
                 user:user
            })
     }catch(err){
          res.send(500)
     }
     

}



exports.getAllUserQuer =async(req,res,next)=>{
     try{
        const query = await Query.find().populate("users", "-Password")
         res.render('ADmin/queryList',{
              data:query
         })
     }catch(err){
          res.sendStatus(500)
     }
}



exports.deleteUser =async(req,res,next)=>{
     const deleteuser =await User.deleteOne({_id:req.params.id})
     res.send("user delete Sucessfully")
}


exports.logout =async(req,res,next)=>{
          res.clearCookie("jwt");
          res.redirect('/api/data/admin/login') 
}