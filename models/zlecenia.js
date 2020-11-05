var mongoose=require('mongoose');
var Schema  = mongoose.Schema;

const zleceniaSchema = new Schema({
  oznaczenie_wejsciowe:  {type: String, required: true }, // String is shorthand for {type: String}
  zlecajacy: {type: String, required:true },
  nr_swiadectwa:{type:String, required: true},
  data_otrzymania: { type: Date, default: Date.now },
  platnik_nazwa:{type:String, required:true},
  data_zlecenia: { type: Date, default: Date.now },
  data_wyk_swiadectwa: { type: Date, default: Date.now },
  oplacono:{type:Boolean,required:true},
  cena_brutto:{type:Number,required:true},
  cena_netto:{type:Number},
  vat:{type:Number},
  whoAdd:{type:String,required:true},
});
// dodaj pole "History of modyfications"
//bedzie to pole przechowyjace historie modyfikacji wraz z data tej modyfikacji ! !
module.exports=mongoose.model('Zlecenia',zleceniaSchema)