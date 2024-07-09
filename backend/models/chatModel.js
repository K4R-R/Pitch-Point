const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
   senderEmail: {
      type:String,
      required:true
   },
   receiverEmail: {
      type:String,
      required:true
   },
   message: {
      type:String,
      required:true
   },
   status: {
      type:String,
      required:true
   }
},{ timestamps:true });

module.exports = mongoose.model('Chats',chatSchema);