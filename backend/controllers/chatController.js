const Chats = require('../models/chatModel');
const Users = require('../models/userModel');

const addChat = async(req,res) => {

   const {senderEmail,receiverEmail,message} = req.body;
   const status = 'Sent';

   try {
      const chat = await Chats.create({senderEmail,receiverEmail,message,status});

      res.status(200).json(chat);
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

const getUserChat = async(req,res) => {

   const {senderEmail} = req.params;

   try {
      const chats = await Chats.find({ $or: [{ senderEmail },{ receiverEmail: senderEmail }] }).sort({"createdAt": 1 });

      res.status(200).json(chats);
      
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

module.exports = {
   addChat,getUserChat
}