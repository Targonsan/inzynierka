const express = require('express');
const router = express.Router();
const zleceniaSchema=require('../models/zlecenia2')



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
        });
        console.log(nowaData);
        console.log(data);
        res.render('add', { title: 'Złożone zlecenia ',data,nowaData });
      })

//   res.render('Oczekujacezamowienia', { title: 'Akceptacja zlecen' });
});

router.get('/add/:id',(req,res)=>{

    console.log(req.params);
    zleceniaSchema.findById(req.params.id,(err,data)=>{
       
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
        wynik_badan_niepewnosc,wynik_badan_niepewnosc,
        wynik_badan_tolerancja:wynik_badan_tolerancja
       }
      //  console.log(info);
      //  console.log(charakter_zlecenia);
      // console.log("adres platnika:",data.adres);
        res.render('addBaza',{title:'Dodaj zlecenie do głównej bazy danych',errors:{},body:data,info,obiektBadany});
    })
  })

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
//   res.render('addBaza',{title:'Dodaj zlecenie do bazy danych',body:data,errors:{},newBodyForData});


module.exports = router;