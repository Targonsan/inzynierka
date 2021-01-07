const express = require('express');
const router = express.Router();
const zleceniaGlownaBaza=require('../models/zleceniaGlownaBaza');

router.all('*',(req,res,next)=>{
  if(!req.session.admin){
    res.render('index', { title: 'Strona głowna ',RejestrationSucess:`aby przejsc do panelu Administratora należy się zalogować ` })
  
    return;
  }
  next();
});


function dataChanger(data){
    let day =data.getDate();
    let month=data.getMonth()+1;
    if(day<=9){
      day='0'+day
    }
    if(month<=9){
      month='0'+ month
    }
    const year=data.getFullYear()
    // console.log(`${day}-${month}-${year}`);
    return `${day}-${month}-${year}`
  }

  function booleanChanger(data){
    let wartosc='';
    if(data===false){
        wartosc='nie';
    } else if(data===true){
        wartosc='tak';
    }else{
        wartosc='nie wiadomo';
    }

    return wartosc;
  }

router.get('/', (req, res, next)=> {
   
    
    zleceniaGlownaBaza.find({},(err,data)=>{
      let dataOtrzymania=[]
      let dataWykonaniaswiadectwa=[]
      let dataPrzekazaniaMiernika=[]
      let Badanie=[]
      let oplacono=[]
     

      data.forEach(element=> {
        dataOtrzymania.push(dataChanger(element.data_otrzymania))
        dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
        dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
        Badanie.push(obiektBadan(element.Obiekt_bada))
        oplacono.push(booleanChanger(element.oplacono))

      });
    //   console.log(dataOtrzymania,'data otrzymania');
    //   console.log(dataWykonaniaswiadectwa,'data wykonaia swiadectwa');
    //   console.log(dataPrzekazaniaMiernika,'data przeazania miernika');
      res.render('print', { title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono});
    })
  });
// ---------------------------------------------------------------------------Filtry 1
  router.get('/filtr', (req, res, next)=> {
    // console.log(req.query.search,req.query.filtr+' halohalo');
    const body=req.query
    const search=req.query.search || ''
    // console.log(req.params+'robie cos !');
      let dataOtrzymania=[]
      let dataWykonaniaswiadectwa=[]
      let dataPrzekazaniaMiernika=[]
      let Badanie=[]
      let oplacono=[]
    if(search===undefined||body.filtr===undefined)
    {
      console.log('jestem przekierowaniem');
      res.redirect('/print')
      return;
    }
    // if(typeof(body.filtr)=='string'){
    //   console.log("jestem stringiem");
    // }else{
    //   console.log(typeof(body.filtr));
    // }
    if(body.filtr==="commissioning"){
      const findOrder=zleceniaGlownaBaza
      .find({nazwa_firmy :new RegExp(search.trim(), 'i') })
      .sort({data_otrzymania :-1})
      ;
      findOrder.exec((err,data)=>{  
        data.forEach(element=> {
            dataOtrzymania.push(dataChanger(element.data_otrzymania))
            dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
            dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
            Badanie.push(obiektBadan(element.Obiekt_bada))
            oplacono.push(booleanChanger(element.oplacono))
        });
        res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
      });
    }else if(body.filtr==="whoAddIt"){
      const findOrder=zleceniaGlownaBaza
      .find({whoAdd :new RegExp(search.trim(), 'i')})
      .sort({data_otrzymania :-1})
      ;
      findOrder.exec((err,data)=>{  
        data.forEach(element=> {
            dataOtrzymania.push(dataChanger(element.data_otrzymania))
            dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
            dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
            Badanie.push(obiektBadan(element.Obiekt_bada))
            oplacono.push(booleanChanger(element.oplacono))
        });
        res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
      });
      }else if(body.filtr==="mail"){
        const findOrder=zleceniaGlownaBaza
        .find({adresMailowyFirmy : new RegExp(search.trim(),'i')})
        .sort({data_otrzymania :-1})
        ;
        findOrder.exec((err,data)=>{  
          data.forEach(element=> {
            dataOtrzymania.push(dataChanger(element.data_otrzymania))
            dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
            dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
            Badanie.push(obiektBadan(element.Obiekt_bada))
            oplacono.push(booleanChanger(element.oplacono))
          });
          res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
        });
        }else if(body.filtr==="imieINazwisko"){
            const findOrder=zleceniaGlownaBaza
            .find({imieINazwiskoPlatnik : new RegExp(search.trim(),'i')})
            .sort({data_otrzymania :-1})
            ;
            findOrder.exec((err,data)=>{  
              data.forEach(element=> {
                dataOtrzymania.push(dataChanger(element.data_otrzymania))
                dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
                dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
                Badanie.push(obiektBadan(element.Obiekt_bada))
                oplacono.push(booleanChanger(element.oplacono))
              });
              res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
            });
            }
        console.log(body.filtr);
    console.log("nie jestem przekierowniame i nie wiadomo co robie");
    return;hn 
  
  });

// ========================================================================Filtr 2

router.get('/filtrData', (req, res, next)=> {
    console.log(req.query);
    const body=req.query
    console.log('od',body.od,'do',body.do);
    // console.log(req.params+'robie cos !');
    let dataOtrzymania=[]
    let dataWykonaniaswiadectwa=[]
    let dataPrzekazaniaMiernika=[]
    let Badanie=[]
    let oplacono=[]
    if(body.filtr===undefined||body.howSort===undefined||body.od===undefined||body.do===undefined)
    {
      res.redirect('/print')
      return;
    }
    if(body.filtr==='cena_brutto'){
      console.log('eee');
      const findOrder=zleceniaGlownaBaza
    .find({data_otrzymania : {$gte:body.od, $lte: body.do}})
    .sort({cena_netto :body.howSort})
    ;
    findOrder.exec((err,data)=>{  
      data.forEach(element=> {
        dataOtrzymania.push(dataChanger(element.data_otrzymania))
        dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
        dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
        Badanie.push(obiektBadan(element.Obiekt_bada))
        oplacono.push(booleanChanger(element.oplacono))
      });
      res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
      return;
    });
    }else if(body.filtr==='char_zlec'){
      console.log('dupa');
      const findOrder=zleceniaGlownaBaza
    .find({data_otrzymania : {$gte:body.od, $lte: body.do}})
    .sort({charakter_zlecenia :body.howSort})
    ;
    findOrder.exec((err,data)=>{  
      data.forEach(element=> {
        dataOtrzymania.push(dataChanger(element.data_otrzymania))
        dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
        dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
        Badanie.push(obiektBadan(element.Obiekt_bada))
        oplacono.push(booleanChanger(element.oplacono))
      });
      res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
    });
    }else if(body.filtr==='WhoAddIt'){
      const findOrder=zleceniaGlownaBaza
    .find({data_otrzymania : {$gte:body.od, $lte: body.do}})
    .sort({whoAdd :body.howSort})
    ;
    findOrder.exec((err,data)=>{  
      data.forEach(element=> {
        dataOtrzymania.push(dataChanger(element.data_otrzymania))
        dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
        dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
        Badanie.push(obiektBadan(element.Obiekt_bada))
        oplacono.push(booleanChanger(element.oplacono))
      });
      res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
    });
    }
    return;
  });
//  ===================================================== sortowanie3
router.get('/sorted/:howSort/:whatSort',(req,res)=>{
    const body=req.params
    console.log(req.params);
    let dataOtrzymania=[]
    let dataWykonaniaswiadectwa=[]
    let dataPrzekazaniaMiernika=[]
    let Badanie=[]
    let oplacono=[]
     if(body.whatSort==='cena'){
      const findOrder=zleceniaGlownaBaza
      .find()
      .sort({cena_brutto :body.howSort})
      ;
      findOrder.exec((err,data)=>{
        data.forEach(element=> {
            dataOtrzymania.push(dataChanger(element.data_otrzymania))
            dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
            dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
            Badanie.push(obiektBadan(element.Obiekt_bada))
            oplacono.push(booleanChanger(element.oplacono))
        });
        res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
      });
      return;
    }else if(body.whatSort==='data'){
      const findOrder=zleceniaGlownaBaza
      .find()
      .sort({data_otrzymania :body.howSort})
      ;
      findOrder.exec((err,data)=>{
        data.forEach(element=> {
            dataOtrzymania.push(dataChanger(element.data_otrzymania))
            dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
            dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
            Badanie.push(obiektBadan(element.Obiekt_bada))
            oplacono.push(booleanChanger(element.oplacono))
        });
        res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
      });
      return;
    }else if(body.whatSort==='WhoAdd'){
      const findOrder=zleceniaGlownaBaza
      .find()
      .sort({ whoAdd:body.howSort})
      ;
      findOrder.exec((err,data)=>{
        data.forEach(element=> {
            dataOtrzymania.push(dataChanger(element.data_otrzymania))
            dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
            dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
            Badanie.push(obiektBadan(element.Obiekt_bada))
            oplacono.push(booleanChanger(element.oplacono))
        });
        res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
      });
      return;
    }else if(body.whatSort==='isPayed'){
      const findOrder=zleceniaGlownaBaza
      .find()
      .sort({ oplacono:body.howSort})
      ;
      findOrder.exec((err,data)=>{
        data.forEach(element=> {
            dataOtrzymania.push(dataChanger(element.data_otrzymania))
            dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
            dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
            Badanie.push(obiektBadan(element.Obiekt_bada))
            oplacono.push(booleanChanger(element.oplacono))
        });
        res.render('print',{title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie,oplacono})
      });
      return;
    }
    // console.log(whatWillBeSorted);
  }); 

//   ============================================================= daneMiernika
router.get('/daneMiernika/:id', (req, res, next)=> {
  const param=req.params
  console.log(param);
  zleceniaGlownaBaza.findById(param.id,function(err,data){

    console.log(data.Obiekt_bada);
    res.render('mierniki', { title: 'Mierniki',body:data.Obiekt_bada });
  })
  
});



//   =============================================================Obiket badan

  function obiektBadan(data){
   let mierenikCount=1;
   let sondaCount1=0;
   let sondaCount2=0;
   let sondaCount3=0;
  if(data.miernik1.sonda1!=='')
   {
      sondaCount1+=1
   }
   if(data.miernik1.sonda2!=='')
   {
      sondaCount1+=1
   }
   if(data.miernik1.sonda3!=='')
   {
      sondaCount1+=1
   }
   if(data.miernik1.sonda4!=='')
   {
      sondaCount1+=1
   }
   if(data.miernik1.sonda5!=='')
   {
      sondaCount1+=1
   }

   if(data.miernik2.nazwa!=='') {
      mierenikCount+=1
      if(data.miernik2.sonda1!=='')
      {
          sondaCount2+=1
      }
   
      if(data.miernik2.sonda2!=='')
      {
          sondaCount2+=1
      }
      if(data.miernik2.sonda3!=='')
      {
          sondaCount2+=1
      }
      if(data.miernik2.sonda4!=='')
      {
          sondaCount2+=1
      }
      if(data.miernik2.sonda5!=='')
      {
          sondaCount2+=1
      }
  }

  if(data.miernik3.nazwa!=='') {
      mierenikCount+=1

      if(data.miernik3.sonda1!=='')
      {
          sondaCount3+=1
      }
   
      if(data.miernik3.sonda2!=='')
      {
          sondaCount3+=1
      }
      if(data.miernik3.sonda3!=='')
      {
          sondaCount3+=1
      }
      if(data.miernik3.sonda4!=='')
      {
          sondaCount3+=1
      }
      if(data.miernik3.sonda5!=='')
      {
          sondaCount3+=1
      }
  }
 
  //  console.log(sondaCount, 'ilosc sonda w mienriku1');
   let miernik2Text=''
   let miernik3Text=''
   if(sondaCount2!==0){
      miernik2Text=`miernik 2 sond: ${sondaCount2}`
   }
   if(sondaCount3!==0){
      miernik3Text=`miernik 3 sond: ${sondaCount3}`
   }
   return `miernik 1 sond:  ${sondaCount1} `+miernik2Text+ ' ' +miernik3Text;
} 

module.exports = router;