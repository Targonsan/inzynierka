var mongoose=require('mongoose');
var Schema  = mongoose.Schema;

const loginSchema = new Schema({
  login:  {type: String, required: true }, // String is shorthand for {type: String}
  password: {type: String, required:true },
  signature:{type:String, required: true},
  created: { type: Date, default: Date.now },
  
});
module.exports=mongoose.model('News',loginSchema)