const express =require('express')
const admincontroller =require('../../controllers/admincontroller/admincontroller')
const {check} = require('express-validator');

const router = express.Router()

router
   .route('/login')
   .get(admincontroller.adminLogInpage)
   .post(
      [
         check('email','Email is not avlid').normalizeEmail().isEmail(),
         check('password','The Password must be 8+char long').isLength({min:8}).isEmpty()
      ],
      admincontroller.login)




// router
//     .route('/signup') 
//     .post(admincontroller.signup)  



module.exports =router