const User =require('../../model/admin')
const jwt =require('jsonwebtoken')
const  adminSecretKey ="ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"






// exports.signup =async(req,res,next)=>{
//      console.log(req.body)
//      try{
//         const {name,email,Password,PasswordCofirm} =req.body
//         User.findOne({email:email},(err,user)=>{
//               if(user){
//                    res.status(202).json({
//                         status:"Accepted",
//                         message:'user Already is Register',
//                         HowToCreateUsreSignup:req.requestTime,
//                    })
//               }else{
//                const newUser = new User({
//                     name,
//                     email,
//                     Password,
//                     PasswordCofirm,
//                     role:'admin'
//                   })
//                 newUser.save(err=>{
//                      if(err){
//                       res
//                          .status(500)
//                          .json({
//                          status:"fail",
//                          message:err,
//                          HowToCreateUsreSignup:req.requestTime
//                      })
//                      }else{
//                          res
//                            .status(201) 
//                            .json({
//                               status:"Sucess",
//                               message:'user Reqisterd Sucessfully',
//                               HowToCreateUsreSignup:req.requestTime,
//                            })
//                      }
//                 })
                
                  
//               }
//          })
          
//      }catch(err){
//           res
//           .status(500)
//           .json({
//           status:"fail",
//           message:err,
//           HowToCreateUsreSignup:req.requestTime
//       })
//      }
// }



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
                 res.cookie('jwt',token,{ httpOnly: true, secure: true, maxAge: 3600000 })
                 res.redirect('/user')
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