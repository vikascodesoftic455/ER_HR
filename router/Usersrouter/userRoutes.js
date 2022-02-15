const express  =require('express')
const authController =require('../../controllers/authController/authController')
const isAuthentication  =require('../../middleware/authication')
const Upload = require('../../middleware/uploadFiles')


const router =express.Router()    

     
router
     .route('/user')  
     .get(
         isAuthentication,
         authController.userPanel
         ) 


router 
   .route('/pages-register')
   .get(authController.signupPage)
   .post(authController.signup)



router
    .route('/login')
    .get(authController.LogInpage)
    .post(authController.login)   



router
     .route('/dashboard')
     .get(
          isAuthentication,
          authController.dashboard
        )   


router
    .route('/changepassword')
    .post(isAuthentication,
        authController.ChangePassword
        )        


// router
//      .route('/getAllUsers')  
//      .get(
//          isAuthentication,
//          authController.getAllUsers
//      )  
     
     
router
     .route('/logout')  
     .post(
         isAuthentication,
         authController.logout
         ) 



router
    .route('/query')
    .post(
        isAuthentication,
        Upload.fields([{ name: 'avatar', maxCount: 6}]),
        authController.Query
    )



router.route('/view/:id').get(authController.getView)  


   module.exports=router