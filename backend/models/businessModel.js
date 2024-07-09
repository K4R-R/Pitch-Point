const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const businessSchema = new Schema({
   founderEmail: {
      type:String,
      required:true
   },
   founderName: {
      type:String,
      required:true
   },
   startupName: {
      type:String,
      required:true
   },
   industry: {
      type:String,
      required:true
   },
   investmentStage: {
      type:String,
      required:true
   },
   productionStage: {
      type:String,
      required:true
   },
   customerGroup: {
      type:String,
      required:true
   }
},{ timestamps:true });

//static method to add business info
businessSchema.statics.addBusiness = async function(founderEmail,founderName,startupName,industry,investmentStage,productionStage,customerGroup) {

   if(!startupName || !industry || !investmentStage || !productionStage || !customerGroup) {
      //console.log(userId,industry,investmentStage,productionStage,customerGroup);
      throw Error('All fields must be filled');
   }

   const checkBusiness = await this.findOne({founderEmail});
   let business;

   if(checkBusiness) {
      checkBusiness.startupName = startupName;
      checkBusiness.industry = industry;
      checkBusiness.investmentStage = investmentStage;
      checkBusiness.productionStage = productionStage;
      checkBusiness.customerGroup = customerGroup;

      business = await checkBusiness.save();
   } else {
      business = await this.create({founderEmail,founderName,startupName,industry,investmentStage,productionStage,customerGroup});
   }

   return business;
}

module.exports = mongoose.model('BusinessInfo',businessSchema);