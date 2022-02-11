const express =require('express')
const Chatcontroller =require('../../controllers/Chatcontrollers/chatControllers')
const isAuthentication  =require('../../middleware/authication')
const router =express.Router()


router
    .route('/:id')
     .post(
         isAuthentication,
         Chatcontroller.createChat
         )
    .get(
        isAuthentication,
        Chatcontroller.fetchChat
        
    )     






module.exports=router