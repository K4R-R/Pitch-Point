const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const startupInfoSchema = new Schema({
   userId: {
      type:String,
      required:true
   },
   startupName: {
      type:String,
      required:true,
      unique:true
   },
   qna: { 
      type: Map, 
      of: String 
   }
},{ timestamps:true });

module.exports = mongoose.model('StartupInfo',startupInfoSchema);