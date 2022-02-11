const express =require('express')
const admincontroller =require('../../controllers/admincontroller/admincontroller')

const router = express.Router()

router
   .route('/login')
   .get(admincontroller.adminLogInpage)
   .post(admincontroller.login)




// router
//     .route('/signup') 
//     .post(admincontroller.signup)  



module.exports =router