const express = require('express');
const router = express.Router();
const zleceniaSchema=require('../models/zlecenia2')
const zleceniaGlownaBaza=require('../models/zleceniaGlownaBaza')



// router.all('*',(req,res,next)=>{
//     if(!req.session.admin){
//       res.render('index', { title: 'Strona głowna ',RejestrationSucess:`aby przejsc do panelu Administratora należy się zalogować ` })
    
//       return;
//     }
//     next();
//   });

function dataChanger(data){
    let day =data.data_otrzymania.getDate();
    let month=data.data_otrzymania.getMonth()+1;
    if(day<=9){
      day='0'+day
    }
    if(month<=9){
      month='0'+ month
    }
    const year=data.data_otrzymania.getFullYear()
    // console.log(`${day}-${month}-${year}`);
    return `${day}-${month}-${year}`
  
}

router.get('/', (req, res, next)=> {

    zleceniaSchema.find({},(err,data)=>{
        // console.log(data);
        let nowaData=[]
        // let nowaDataOtrzymania=[]
        // let nowaData_zlecenia
        data.forEach(element=> {
          // console.log(typeof(element.data_otrzymania));
          if(element.data_otrzymania!==null){
            // element.data_otrzymania= dataChanger(element)
            
            nowaData.push(dataChanger(element))
            // console.log(element.data_otrzymania);
            // console.log(moment().utc().format('D-M-Y'));
            }
            if(element.CzyDodanoJuz==="false"){
              console.log("nie dodano mnei jeszcze");
            } else if(element.CzyDodanoJuz==="true"){
              console.log("dodano mnie");
            }
        });

        
        // console.log(nowaData);
        // console.log(data);
        res.render('add', { title: 'Złożone zlecenia ',data,nowaData });
      })

//   res.render('Oczekujacezamowienia', { title: 'Akceptacja zlecen' });
});

//=========================================================================================funkcja do daty
function dataChanger2(data){
  console.log(data);
  let day =data.getDate();
  let month=data.getMonth()+1;
  if(day<=9){
    day='0'+day
  }
  if(month<=9){
    month='0'+ month
  }
  let year=data.getFullYear()
  console.log(`${day}-${month}-${year}`);
  return `${year}-${month}-${day}`

}
// ===================================================================================================get edit !
router.get('/edit/:id',(req,res)=>{

  console.log(req.params);
  zleceniaGlownaBaza.findById(req.params.id,(err,data)=>{
    newBodyForData={
      data_otrzymania:dataChanger2(data.data_otrzymania),
      data_wyk_swiadectwa:dataChanger2(data.data_wyk_swiadectwa),
      data_przekazania_miernika:dataChanger2(data.data_przekazania_miernika),
  }

      res.render('editadd',{title:'Dodaj zlecenie do głównej bazy danych',errors:{},body:data,newBodyForData});
  })
})

// =======================================================================================edit add id
router.post('/edit/:id',(req,res)=>{
  const id= req.params.id;
  const body=req.body;
  const radio_button=isPayed(body.oplacono)
  
  let obiektBadany={
    miernik1:{
      nazwa:body.cel_miernik1_nazwa,
      sonda1:body.cel_miernik1_sonda1,
      sonda2:body.cel_miernik1_sonda2||'',
      sonda3:body.cel_miernik1_sonda3||'',
      sonda4:body.cel_miernik1_sonda4||'',
      sonda5:body.cel_miernik1_sonda5||'',
    },
    miernik2:{
      nazwa:body.cel_miernik2_nazwa||'',
      sonda1:body.cel_miernik2_sonda1||'',
      sonda2:body.cel_miernik2_sonda2||'',
      sonda3:body.cel_miernik2_sonda3||'',
      sonda4:body.cel_miernik2_sonda4||'',
      sonda5:body.cel_miernik2_sonda5||'',
    },
    miernik3:{
      nazwa:body.cel_miernik3_nazwa||'',
      sonda1:body.cel_miernik3_sonda1||'',
      sonda2:body.cel_miernik3_sonda2||'',
      sonda3:body.cel_miernik3_sonda3||'',
      sonda4:body.cel_miernik3_sonda4||'',
      sonda5:body.cel_miernik_sonda5||'',
    }
  };

  const brutto=body.cena_netto*1.23;
  zleceniaGlownaBaza.findById(id,function(err,data){
  
        
    data.nazwa_firmy=body.nazwa_firmy 
    data.adres= body.adres_firmy
    data.nip=body.nip_firmy
    data.data_otrzymania=body.d_zlec

    data.imieINazwisko=body.dane_przedstawiciela
    data.nrTel_firmy=body.nr_tel_firmy
    data.adresMailowyFirmy=body.adres_mail_firmy
    data.adresMailowyFaktura=body.adres_mail_faktura
    data.AdresFizycznyFaktura=body.adres_fizyczny_faktura
      
    data.adresPlatnik=body.Adres_platnik
    data.imieINazwiskoPlatnik=body.Dane_platnik
    data.nrTel_Platnik=body.nr_tel_platnik
    data.adresMailowyPlatnik=body.adres_mail_platnik

    data.charakter_zlecenia=body.char_zlecenia2
    data.Forma_wspolpracy=body.form_wspolpracy2
    data.cel_badan=body.cel_badan2
    data.wynik_badan_niepewnosc=body.wynik_badan_niepewnosc2
    data.wynik_badan_tolerancja=body.wynik_badan_tolerancja2
    data.Obiekt_bada=obiektBadany
    data.info_dodatkowe=body.dodatkowe_informacje
    data.data_wyk_swiadectwa=body.d_swiadectwa
    data.data_przekazania_miernika=body.d_przekazania
    data.cena_netto=body.cena_netto
    data.cena_brutto=brutto
    data.whoAdd=req.session.userSignature
    data.oplacono=radio_button
      data.save((err)=>{
        console.log(err);
          if(err){
            
            res.redirect('/print')
          }
          res.redirect('/')
          });
   
// ewentualne błędy w wvalidacji danych !

  

  

    // res.render('addBaza',{title:'Dodaj zlecenie do głównej bazy danych',errors:{},body:data,info,obiektBadany,});
  })
})


// ===================================================================================================add id
router.get('/add/:id',(req,res)=>{

    console.log(req.params);
    zleceniaSchema.findById(req.params.id,(err,data)=>{
      // let newBodyForData={
      //   d_swiadectwa:'11.11.1111',
      //   d_przekazania:'11.11.1111',
      // }
       
       let charakter_zlecenia
       let Forma_wspolpracy
       let cel_badan
       let wynik_badan_niepewnosc
       let wynik_badan_tolerancja
        if(data.charakter_zlecenia===false){
          charakter_zlecenia='stale'
        }else{
          charakter_zlecenia='jednorazowe'
        }
        if(data.Forma_wspolpracy===false){
          Forma_wspolpracy='umowa'
        }else{
          Forma_wspolpracy='zamówienie'
        }
        if(data.cel_badan===false){
          cel_badan='dla potrzeb obszaru regulowanego'
        }else{
          cel_badan='dla potrzeb własnych'
        }
        if(data.wynik_badan_niepewnosc===false){
          wynik_badan_niepewnosc='nie'
        }else{
          wynik_badan_niepewnosc='tak'
        }
        if(data.wynik_badan_tolerancja===false){
          wynik_badan_tolerancja='nie'
        }else{
          wynik_badan_tolerancja='tak'
        }
       const obiektBadany= obiektBadanyFunkcja(data.Obiekt_bada)
      //  charakter_zlecenia===false? 'umowa':'zamówienie'
      //  Forma_wspolpracy===false? 'dla potrzeb obszaru regulowanego':'dla potrzeb własnych'
      //  cel_badan===false? 'zamówienie':'umowa'
      //  wynik_badan_niepewnosc===false? 'nie':'tak'
      //  wynik_badan_tolerancja===false? 'nie':'tak'
      console.log(obiektBadany, 'obiekt badany');
       const info={
        charakter_zlecenia:charakter_zlecenia,
        Forma_wspolpracy:Forma_wspolpracy,
        cel_badan:cel_badan,
        wynik_badan_niepewnosc:wynik_badan_niepewnosc,
        wynik_badan_tolerancja:wynik_badan_tolerancja
       }
      //  console.log(info);
      //  console.log(charakter_zlecenia);
      // console.log("adres platnika:",data.adres);
      console.log(data.adresPlatnik,'adres platnika ' );
        res.render('addBaza',{title:'Dodaj zlecenie do głównej bazy danych',errors:{},body:data,info,obiektBadany,});
    })
  })

  function isPayed(data){
    if(data==='tak') return true;
    else return false;
    
  }

router.post('/add/:id',(req,res)=>{
  const body=req.body;
  console.log(body);
  const radio_button=isPayed(body.oplacono)
  let info={
    charakter_zlecenia:body.char_zlecenia2,
    Forma_wspolpracy:body.form_wspolpracy2,
    cel_badan:body.cel_badan2,
    wynik_badan_niepewnosc:body.wynik_badan_niepewnosc2,
    wynik_badan_tolerancja:body.wynik_badan_tolerancja2,
  }
  // const id=req.params.id
  let obiektBadany={
    miernik1:{
      nazwa:body.cel_miernik1_nazwa,
      sonda1:body.cel_miernik1_sonda1,
      sonda2:body.cel_miernik1_sonda2||'',
      sonda3:body.cel_miernik1_sonda3||'',
      sonda4:body.cel_miernik1_sonda4||'',
      sonda5:body.cel_miernik1_sonda5||'',
    },
    miernik2:{
      nazwa:body.cel_miernik2_nazwa||'',
      sonda1:body.cel_miernik2_sonda1||'',
      sonda2:body.cel_miernik2_sonda2||'',
      sonda3:body.cel_miernik2_sonda3||'',
      sonda4:body.cel_miernik2_sonda4||'',
      sonda5:body.cel_miernik2_sonda5||'',
    },
    miernik3:{
      nazwa:body.cel_miernik3_nazwa||'',
      sonda1:body.cel_miernik3_sonda1||'',
      sonda2:body.cel_miernik3_sonda2||'',
      sonda3:body.cel_miernik3_sonda3||'',
      sonda4:body.cel_miernik3_sonda4||'',
      sonda5:body.cel_miernik_sonda5||'',
    }
  };
 

  const brutto=body.cena_netto*1.23;

    const zlecenieNoweDoGlownej=new zleceniaGlownaBaza({
        
      nazwa_firmy:body.nazwa_firmy ,
      adres: body.adres_firmy,
      nip:body.nip_firmy,

      imieINazwisko:body.dane_przedstawiciela,
      nrTel_firmy:body.nr_tel_firmy,
      adresMailowyFirmy:body.adres_mail_firmy,
      adresMailowyFaktura:body.adres_mail_faktura,
      AdresFizycznyFaktura:body.adres_fizyczny_faktura,
      
      adresPlatnik:body.Adres_platnik,
      imieINazwiskoPlatnik:body.Dane_platnik,
      nrTel_Platnik:body.nr_tel_platnik,
      adresMailowyPlatnik:body.adres_mail_platnik,

      charakter_zlecenia:body.char_zlecenia2,
      Forma_wspolpracy:body.form_wspolpracy2,
      cel_badan:body.cel_badan2,
      wynik_badan_niepewnosc:body.wynik_badan_niepewnosc2,
      wynik_badan_tolerancja:body.wynik_badan_tolerancja2,
      Obiekt_bada:obiektBadany,
      info_dodatkowe:body.dodatkowe_informacje,
      data_wyk_swiadectwa:body.d_swiadectwa,
      data_przekazania_miernika:body.d_przekazania,
      cena_netto:body.cena_netto,
      cena_brutto:brutto,
      whoAdd:req.session.userSignature,
      oplacono:radio_button,
      });
// ewentualne błędy w wvalidacji danych !

  const errors = zlecenieNoweDoGlownej.validateSync();

  zlecenieNoweDoGlownej.save((err)=>{
  console.log(err);
    if(err){

      res.render('addBaza',{title:'Dodaj zlecenie',errors,body,info,obiektBadany});
      return;
    }
    changeStatus(req.params.id)
    res.redirect('/add')
    });

    // res.render('addBaza',{title:'Dodaj zlecenie do głównej bazy danych',errors:{},body:data,info,obiektBadany,});
  })
 
  // router.get('add/zmienStatus/:id', (req, res, next)=> {
  //   zleceniaSchema.findById(req.params.id,(err,data)=>{console.log( 'to co znalazłem');})
  //   res.redirect('/')
  // })
  function changeStatus(id){
    zleceniaSchema.findByIdAndUpdate(
      { _id: id },
      { CzyDodanoJuz: "true" },
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("udało sie podmienic ");
        }
      }
    );
  }
  





function obiektBadanyFunkcja(data){
  // console.log(data);
  const parts=data.split(',')
  const parts22=[]
  const parts23=[]
  const parts24=[]

  // console.log(parts);
  // const miernik1=parts.split('+')
  // console.log(miernik1);
  let index=0;
  parts.forEach(el=>{
    let strings=el
    const parts2=strings.split('+');
    // console.log(parts2);
    
    let objekt= {}
    parts2.forEach(element=>{
      if(index===0){
        parts22.push(element)
      }else if(index===1){
        parts23.push(element)
      }else if(index===2){
        parts24.push(element)
      }
      // objekt.push=element;
      // console.log(element+' ',index);
     
    })
    index+=1;
    console.log(objekt);
  })
  let kal={
    miernik1:{
      nazwa:parts22[0],
      sonda1:parts22[1]||'',
      sonda2:parts22[2]||'',
      sonda3:parts22[3]||'',
      sonda4:parts22[4]||'',
      sonda5:parts22[5]||'',
    },
    miernik2:{
      nazwa:parts23[0]||'',
      sonda1:parts23[1]||'',
      sonda2:parts23[2]||'',
      sonda3:parts23[3]||'',
      sonda4:parts23[4]||'',
      sonda5:parts23[5]||'',
    },
    miernik3:{
      nazwa:parts24[0]||'',
      sonda1:parts24[1]||'',
      sonda2:parts24[2]||'',
      sonda3:parts24[3]||'',
      sonda4:parts24[4]||'',
      sonda5:parts24[5]||'',
    }
  };
  // console.log(kal.miernik1);
  // console.log(kal.miernik2);
  // console.log(kal.miernik3);
  // console.log(kal);
return kal;

}
router.get('/testowanie', (req, res, next)=> {

  zleceniaGlownaBaza.find({},(err,data)=>{
      // console.log(data);
      console.log(typeof(data));
      let nowaData=[]
      // let nowaDataOtrzymania=[]
      // let nowaData_zlecenia
      data.forEach(element=> {
        // console.log(typeof(element.data_otrzymania));
        console.log(element.Obiekt_bada.miernik1);
      });
      // console.log(nowaData);
      // console.log(data);
      res.render('add', { title: 'Złożone zlecenia ',data,nowaData });
    })

//   res.render('Oczekujacezamowienia', { title: 'Akceptacja zlecen' });
});



//   res.render('addBaza',{title:'Dodaj zlecenie do bazy danych',body:data,errors:{},newBodyForData});app.get('/test', function (req, res) {
    


module.exports = router;