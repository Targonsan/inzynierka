var mongoose=require('mongoose');
var Schema  = mongoose.Schema;

const zleceniaSchema = new Schema({
  nazwa_firmy:  {type: String, required: [true,'pole Nazwa firmy  jest wymagane'] }, // String is shorthand for {type: String}
  adres: {type: String, required:[true,'pole Adres jest wymagane'] },
  nip:{type:String, required: [true,'pole nip jest wymagane']},
  data_otrzymania: { type: Date, default: Date.now },
  CzyDodanoJuz: { type: String, default: false },

  imieINazwisko:{type:String, required:[true,'pole imie i nazwisko  jest wymagane']},
  nrTel_firmy:{type:String, required:[true,'pole numer telefonu jest wymagane']},
  adresMailowyFirmy:{type:String, required:[true,'pole Adres mailowy formy jest wymagane']},
  adresMailowyFaktura:{type:String, required:[true,'pole Adres mailowy do wysynia faktury jest wymagane']},
  AdresFizycznyFaktura: { type: String, required:[true,'Adres fizyczny do wysłania faktury   jest wymagany']},
  adresPlatnik:{type:String, required:[true,'pole Adres jest wymagane']},
  imieINazwiskoPlatnik:{type:String, required:[true,'pole imie i nazwisko  jest wymagane']},
  nrTel_Platnik:{type:String, required:[true,'pole numer telefonu jest wymagane']},
  adresMailowyPlatnik:{type:String, required:[true,'pole Adres mailowy  jest wymagane']},
  
  charakter_zlecenia:{type:Boolean,required:[true,'pole Charakter zlecenia jest wymagane']},
  Forma_wspolpracy:{type:Boolean,required:[true,'pole Forma współpracy  jest wymagane']},
  cel_badan:{type:Boolean,required:[true,'pole Cel badań/wzorcowania/pobierania próbek jest wymagane']},
  wynik_badan_niepewnosc:{type:Boolean,required:[true,'pole Wyniki badnań podać z niepewnością jest wymagane']},
  wynik_badan_tolerancja:{type:Boolean,required:[true,'pole Wyniki badnań podać z tolerancją  jest wymagane']},
  Obiekt_bada:{type:String, required:[true,'pole Obiekt badań/wzorcowań/pobierania próbek  jest wymagane']},
  info_dodatkowe:{type:String,},

});
// dodaj pole "History of modyfications"
//bedzie to pole przechowyjace historie modyfikacji wraz z data tej modyfikacji ! !
module.exports=mongoose.model('ZleceniaOdKlienta',zleceniaSchema)