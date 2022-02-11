const express =require('express')
const isAuthentication =require('../../middleware/authication')
const MessageContoller =require('../../controllers/MessageController/messagecontroller')

const router =express.Router()

router.route("/").post(isAuthentication, MessageContoller.sendMessage);
router.route('/:chatId').get(isAuthentication,MessageContoller.checkAllmeasage)


module.exports=router