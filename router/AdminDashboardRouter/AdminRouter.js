const express =require('express')
const router =express.Router()
const authcontroller =require('../../controllers/authController')

router
    .route('/AlluserDetails')
    .get()