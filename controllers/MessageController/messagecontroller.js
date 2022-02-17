const User=require('../../model/admin')
const Message =require('../../model/message')
const Chat =require('../../model/chat')



exports.sendMessage=async(req,res,next)=>{
   const { newmessage, chatId } = req.body;
   
   if (!newmessage || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }
   
    var newMessage = {
        sender: req.data.userId,
        message: newmessage,
        chat: chatId,
      };

      try{
          var message =await Message.create(newMessage)
          message = await message.populate("chat")
          message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
          });
          await Chat.findByIdAndUpdate(chatId,{latestMessage:message},{new:true})
       res.json(message);
      }catch(err){
          res.sendStatus(500)

      }
}



exports.checkAllmeasage=async(req,res,next)=>{
    try{
        const message =await Message.find({chat:req.params.chatId}) .populate("sender", "name photo").populate("chat");
        res.status(201).json(message)
        
    }catch(err){
        res.status(400).json({error:err.message})
    }
}