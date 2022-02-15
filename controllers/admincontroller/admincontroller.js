const User =require('../../model/admin')
const Query =require('../../model/Query')
const jwt =require('jsonwebtoken')

const  adminSecretKey ="ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"




 exports.adminLogInpage =(req,res,next)=>{
     res.render('ADmin/login')
 }

exports.login =async(req,res,next)=>{
     try{ 
           const {email,password} =req.body
           console.log(email,password)
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
           console.log(user)
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
              console.log(token,"vdj")
                 res.cookie('jwt',token,{ httpOnly: true, secure: true, maxAge: 3600000 })
                 res.send("<h1>Hello codesoftic</h1>");
           }else{
                res.status(401).json({
                     satusCode:401,
                     message:'Incorrect the email && password',
                })
           }
     }catch(err){
        res
         .status(500)
         .json({
              status:"fail",
              message:err,
              HowToCreateUsreSignup:req.requestTime
        })
     }
}




exports.getAllUserDetails =async(req,res,next)=>{
     try{
          const user = await User.find({role:'user'})
          res.send(user)
     }catch(err){
          res.send(500)
     }
     

}



exports.getAllUserQuer =async(req,res,next)=>{
     try{
        const query = await Query.find().populate("users", "-Password")
        res.send(query);
     }catch(err){
          res.sendStatus(500)
     }
}



exports.deleteUser =async(req,res,next)=>{
     console.log(req.params.id)
     const deleteuser =await User.deleteOne({_id:req.params.id})
     res.send("user delete Sucessfully")
}