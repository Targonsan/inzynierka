var mongoose=require('mongoose');
var Schema  = mongoose.Schema;

const zleceniaSchema = new Schema({
  oznaczenie_wejsciowe:  {type: String, required: [true,'pole oznaczenie wejsciowe jest wymagane'] }, // String is shorthand for {type: String}
  zlecajacy: {type: String, required:[true,'pole zlecajacy jest wymagane'] },
  nr_swiadectwa:{type:String, required: [true,'pole numer swiadectwa jest wymagane']},
  data_otrzymania: { type: Date, default: Date.now },
  platnik_nazwa:{type:String, required:[true,'pole nazwa płatnika jest wymagane']},
  data_zlecenia: { type: Date,required:[true,'Wybierz date zlecenia !']},
  data_wyk_swiadectwa: { type: Date, required:[true,'Data wykonania swiadectwa jest wymagana']},
  oplacono:{type:Boolean,required:[true,'czy zamówienie jest opłacone  jest wymagane']},
  cena_brutto:{type:Number,required:[true,'cena brutto jest wymagana']},
  cena_netto:{type:Number},
  vat:{type:Number},
  whoAdd:{type:String,required:true},
});
// dodaj pole "History of modyfications"
//bedzie to pole przechowyjace historie modyfikacji wraz z data tej modyfikacji ! !
module.exports=mongoose.model('Zlecenia',zleceniaSchema)