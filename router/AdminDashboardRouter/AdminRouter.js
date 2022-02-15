const express =require('express')
const router =express.Router()
const authcontroller =require('../../controllers/admincontroller/admincontroller')

router
    .route('/AlluserDetails')
    .get(authcontroller.getAllUserDetails)



router.route('/getAllUserQuery').get(authcontroller.getAllUserQuer)

router.route('/delete/:id').get(authcontroller.deleteUser)



 module.exports =router   


