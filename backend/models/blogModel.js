const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
   userId: {
      type:String,
      required:true
   },
   title: {
      type:String,
      required:true
   },
   author: {
      type:String,
      required:true
   },
   content: {
      type:String,
      required:true
   }
},{ timestamps:true });

module.exports = mongoose.model('Blogs',blogSchema);