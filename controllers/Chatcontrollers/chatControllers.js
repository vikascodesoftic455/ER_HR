const Chat = require('../../model/chat')
const Message =require('../../model/message')
const User =require('../../model/admin')

exports.createChat =async(req,res,next)=>{
    const  userId  = req.params.id;
   
 if (!userId) {
   return res.sendStatus(400);
 }

 var isChat = await Chat.find({
   $and: [
     { users: { $elemMatch: { $eq: req.data.userId} } },
     { users: { $elemMatch: { $eq: userId } } },
   ],
 })
   .populate("users", "-Password")
   .populate("latestMessage");


 isChat = await User.populate(isChat, {
   path: "latestMessage.sender",
   select: "name pic email",
 });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      users: [req.data.userId, userId],
    };

   try {
     const createdChat = await Chat.create(chatData);
     const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
       "users",
       "-password"
     );
     res.status(200).json(FullChat);
   } catch (error) {
     res.status(400).json({
         error:error.message
     })
   }
 }
}


exports.fetchChat=async(req,res,next)=>{
  try{
     const results =  await Chat.find({ users: { $elemMatch: { $eq: req.data.userId } } }) .populate("users", "-Password") .populate("latestMessage")  .sort({ updatedAt: -1 })
       const data = await User.populate(results,{    path: "latestMessage.sender", select: "name email", })   
      res.render('Chatbox',{
        chat:data
      })
  }catch(err){
    console.log(err)
  }
}



