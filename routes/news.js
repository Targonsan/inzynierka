// const e = require('express');
const moment = require('moment')
const express = require('express');
const router = express.Router();
const zleceniaModels=require('../models/zlecenia')


router.all('*',(req,res,next)=>{
  if(!req.session.admin){
    res.render('index', { title: 'Strona głowna ',RejestrationSucess:`Aby przeglądać lub edytować zlecenie należy być zalogowanym` })
  
    return;
  }
  next();
});

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
  // pobiera wszystko !
  // nie towrzy zmiennej const data=zleceniaModels.find({},(err,data)) tylko inna bez nazwy const data sie odnosi zeby było asynchoricznie?
  // odpwoeidz zostanie dopieor wysąłana wteyd jak skonczy pobeirnaie dancyh nie? bo tak to by sie wyrenderowało sobie bez w ogólne pobierania 
  zleceniaModels.find({},(err,data)=>{
    // console.log(data);
    let nowaData=[]
    data.forEach(element=> {
      // console.log(typeof(element.data_otrzymania));
      if(element.data_otrzymania!==null){
        // element.data_otrzymania= dataChanger(element)
        
        nowaData.push(dataChanger(element))
        // console.log(element.data_otrzymania);
        // console.log(moment().utc().format('D-M-Y'));
        }
    });
    res.render('news', { title: 'Złożone zlecenia ',data,nowaData });
  })
});

// służy do usówania rzeczy z bazy danych
router.get('/delete/:id/:zlecajacy',(req,res)=>{
  console.log(req.params);
  const body=req.params
  zleceniaModels.findByIdAndDelete(req.params.id,(err)=>{
    res.render('index', { title: 'Strona głowna ',RejestrationSucess:'udało się usunąć zlecenie o id: '+body.id+' Zlecajacym był: '+body.zlecajacy });
  })
})

router.get('/sorted/:howSort/:whatSort',(req,res)=>{
  const body=req.params
  console.log(req.params);
  let nowaData=[]
   if(body.whatSort==='cena'){
    const findOrder=zleceniaModels
    .find()
    .sort({cena_brutto :body.howSort})
    ;
    findOrder.exec((err,data)=>{
      data.forEach(element=> {
        nowaData.push(dataChanger(element))
      });
      res.render('news',{title:'Złożone zlecenia',data,nowaData})
    });
    return;
  }else if(body.whatSort==='data'){
    const findOrder=zleceniaModels
    .find()
    .sort({data_otrzymania :body.howSort})
    ;
    findOrder.exec((err,data)=>{
      data.forEach(element=> {
        nowaData.push(dataChanger(element))
      });
      res.render('news',{title:'Złożone zlecenia',data,nowaData})
    });
    return;
  }else if(body.whatSort==='WhoAdd'){
    const findOrder=zleceniaModels
    .find()
    .sort({ whoAdd:body.howSort})
    ;
    findOrder.exec((err,data)=>{
      data.forEach(element=> {
        nowaData.push(dataChanger(element))
      });
      res.render('news',{title:'Złożone zlecenia',data,nowaData})
    });
    return;
  }else if(body.whatSort==='isPayed'){
    const findOrder=zleceniaModels
    .find()
    .sort({ oplacono:body.howSort})
    ;
    findOrder.exec((err,data)=>{
      data.forEach(element=> {
        nowaData.push(dataChanger(element))
      });
      res.render('news',{title:'Złożone zlecenia',data,nowaData})
    });
    return;
  }
  // console.log(whatWillBeSorted);
  
 
  
});

module.exports = router;