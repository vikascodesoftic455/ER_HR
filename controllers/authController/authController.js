const User =require('../../model/admin')
const Query =require('../../model/Query')
const fs =require('fs')
const jwt =require('jsonwebtoken')
const SecretKey ="vhdscsjfcsufjscvsvcsakvcMcvgwgad"
const path =require('path')
const routerdash=path.join(__dirname,'../../public/upload/document/')
console.log(routerdash)

// fs.readFile('routerdash/1644823687282-562823121-1587544700099.jpeg','utf-8',(err,data)=>{
//      if (err) {
//           console.error(err);
//           return
//         }
//         console.log(data);
// })


exports.userPanel =async(req,res,next)=>{
     const data = await Query.find({users:req.data.userId}).populate('users','-role')
     console.log(data)
     const admin =await User.findOne({role:'admin'})
     res.render('home',{
          data:data,
          admin:admin
     })
  }


exports.signupPage =(req,res,next)=>{
    res.render('signup')
}


exports.signup =async(req,res,next)=>{
     console.log(req.body)
     try{
        const {name,email,Password,PasswordCofirm} =req.body
        User.findOne({email:email},(err,user)=>{
              if(user){
                   res.status(202).json({
                        status:"Accepted",
                        message:'user Already is Register',
                        HowToCreateUsreSignup:req.requestTime,
                   })
              }else{
               const newUser = new User({
                    name,
                    email,
                    Password,
                    PasswordCofirm
                  })
                newUser.save(err=>{
                     if(err){
                      res
                         .status(500)
                         .json({
                         status:"fail",
                         message:err,
                         HowToCreateUsreSignup:req.requestTime
                     })
                     }else{
                         res
                           .status(201) 
                           .json({
                              status:"Sucess",
                              message:'user Reqisterd Sucessfully',
                              HowToCreateUsreSignup:req.requestTime,
                           })
                     }
                })
                
                  
              }
         })
          
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

exports.LogInpage =(req,res,next)=>{
     res.render('login')
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
            const user =await User.findOne({
               $and:[
                    {email:email},
                    {role:'user'}
                    ]
           }).select('+Password')
            const correct = await user.correctPassword(password,user.Password)
            if(correct==true){
                var token = jwt.sign({
                    userId:user.id
               },SecretKey,{ expiresIn :'1h' })
                  
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


exports.dashboard =async(req,res,next)=>{
     try{
          const id =req.data.userId
          const UserData =awaitUser.findOne({_id:id})
          console.log( UserData)
         if(!UserData){
             res.status(401).json({satusCode:401,message:'Unauthorized admin '})
         }else{
             res.status(201).json({satusCode:201,message:'Authorized Admin', UserData})
         }
            
     }catch(err){
          res.status(500).json({
               satusCode:500,
               message:'Failed && Internal Server Error and Please Try Again',
     
          })
     }
}



 exports.ChangePassword  =async(req,res,next)=>{
   try{

     const {oldPassword,newPassword,confirmNewpassword}=req.body
          if(newPassword===confirmNewpassword){
                if(oldPassword!=newPassword){
                   const admin = awaitUser.findById({_id:req.data.userId}).select('+Password')
                    admin.Password =newPassword
                    admin.PasswordCofirm=confirmNewpassword
                    await admin.save()
                    res.status(201).json({
                         message:'Password changed SucessFully'
                    })
                }
          }else{
               res.status(405).json({
                    statuscode:405,
                    message:"New Password and confirm password are not same "
               })
          }         
   }catch(err){
        console.log(err)
              res.status(400).json({
                   status:"fail",
                   HowToCreateUsreSignup:req.requestTime,
                   data:{
                     err
                   }
              })
        }
 }

exports.logout=async(req,res,next)=>{
  
          res.clearCookie("jwt");
          res.redirect('/login')  
}



exports.Query =async(req,res,next)=>{
   try{
       let files =req.files.avatar
       console.log(files)
       var mutliplefiles =[]
        files.map((file,index)=>{
          mutliplefiles.push(file.filename)
        })
      console.log(mutliplefiles,"vikas")
     
     const {Create,Review,Payroll,End_of_Service,Policy_and_Procedure,Talent_Acquisition,Training_and_Coaching} =req.body

     const data= {   users:req.data.userId,Create,Review,Payroll,End_of_Service,Policy_and_Procedure,Talent_Acquisition,Training_and_Coaching,avatar:mutliplefiles}
     const query = await new Query(data)
     query.save()
      res.redirect('/user')

   }catch(err){
        res.sendStatus(500)
   }
     
}



exports.getView=async(req,res,next)=>{
     try{
           console.log(req.params.id,"vikas")
            const query = await Query.findOne({_id:req.params.id})
            console.log(query.avatar)
           res.render('view',{
             data:query.avatar
           })

     }catch(err){
          res.sendStatus(500)
     }
} 



