const express =require('express')
const router =express.Router()
const admincontroller =require('../../controllers/admincontroller/admincontroller')
const isAdmin =require('../../middleware/adminAuthentication')

router
     .route('/')
     .get(
            isAdmin,
            admincontroller.DashBoard
        )

router
    .route('/AlluserDetails')
    .get(
            isAdmin,
            admincontroller.getAllUserDetails
        )



router
     .route('/getAllUserQuery')
     .get(
         isAdmin,
         admincontroller.getAllUserQuer
         )

router
    .route('/delete/:id')
    .get(
        isAdmin,
       admincontroller.deleteUser
       )


router
     .route('/logout')
     .post(
         
        
        isAdmin,
         admincontroller.logout
        )


 module.exports =router   


