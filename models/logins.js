var mongoose=require('mongoose');
var Schema  = mongoose.Schema;

const loginSchema = new Schema({
  login:  {type: String, required: [true,'pole login jest wymagane'] }, // String is shorthand for {type: String}
  password: {type: String, required:[true,'pole password jest wymagane'] },
  signature:{type:String, required: [true,'pole podpis jest wymagane']},
  created: { type: Date, default: Date.now },
  
});
module.exports=mongoose.model('News',loginSchema)