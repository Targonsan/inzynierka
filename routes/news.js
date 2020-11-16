// const e = require('express');
const moment = require('moment')
const express = require('express');
const router = express.Router();
const zleceniaModels=require('../models/zlecenia');
const { update } = require('../models/zlecenia');


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
  console.log(req.query);
  // pobiera wszystko !
  // nie towrzy zmiennej const data=zleceniaModels.find({},(err,data)) tylko inna bez nazwy const data sie odnosi zeby było asynchoricznie?
  // odpwoeidz zostanie dopieor wysąłana wteyd jak skonczy pobeirnaie dancyh nie? bo tak to by sie wyrenderowało sobie bez w ogólne pobierania 
  zleceniaModels.find({},(err,data)=>{
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
    res.render('news', { title: 'Złożone zlecenia ',data,nowaData });
  })
});
// pierwszy filtr czyli ten kóry jest wyzje i ma 3 radio buttony !
// co sie dzije kiedy nie ma search a jest 
router.get('/filtr', (req, res, next)=> {
  // console.log(req.query.search,req.query.filtr+' halohalo');
  const body=req.query
  const search=req.query.search || ''
  // console.log(req.params+'robie cos !');
  let nowaData=[]
  if(search===undefined||body.filtr===undefined)
  {
    console.log('jestem przekierowaniem');
    res.redirect('/news')
    return;
  }
  // if(typeof(body.filtr)=='string'){
  //   console.log("jestem stringiem");
  // }else{
  //   console.log(typeof(body.filtr));
  // }
  if(body.filtr==="commissioning"){
    const findOrder=zleceniaModels
    .find({zlecajacy :new RegExp(search.trim(), 'i') })
    .sort({cena_brutto :-1})
    ;
    findOrder.exec((err,data)=>{  
      data.forEach(element=> {
        nowaData.push(dataChanger(element))
      });
      res.render('news',{title:'Złożone zlecenia',data,nowaData})
    });
  }else if(body.filtr==="whoGetIt"){
    const findOrder=zleceniaModels
    .find({whoAdd :new RegExp(search.trim(), 'i')})
    .sort({cena_brutto :-1})
    ;
    findOrder.exec((err,data)=>{  
      data.forEach(element=> {
        nowaData.push(dataChanger(element))
      });
      res.render('news',{title:'Złożone zlecenia',data,nowaData})
    });
    }else if(body.filtr==="markBy"){
      const findOrder=zleceniaModels
      .find({oznaczenie_wejsciowe : new RegExp(search.trim(),'i')})
      .sort({cena_brutto :-1})
      ;
      findOrder.exec((err,data)=>{  
        data.forEach(element=> {
          nowaData.push(dataChanger(element))
        });
        res.render('news',{title:'Złożone zlecenia',data,nowaData})
      });
      }
      console.log(body.filtr);
  console.log("nie jestem przekierowniame i nie wiadomo co robie");
  return;

});
// filtrowanie kiedy już wybierze się przedział daty jaki się chce !
router.get('/filtrData', (req, res, next)=> {
  console.log(req.query);
  const body=req.query
  // console.log(req.params+'robie cos !');
  let nowaData=[]
  if(body.filtr===undefined||body.howSort===undefined||body.od===undefined||body.do===undefined)
  {
    res.redirect('/news')
    return;
  }
  if(body.filtr==='commissioning'){
    console.log('dupa');
    const findOrder=zleceniaModels
  .find({data_otrzymania : {$gte:body.od, $lte: body.do}})
  .sort({zlecajacy :body.howSort})
  ;
  findOrder.exec((err,data)=>{  
    data.forEach(element=> {
      nowaData.push(dataChanger(element))
    });
    res.render('news',{title:'Złożone zlecenia',data,nowaData})
    return;
  });
  }else if(body.filtr==='Date'){
    console.log('dupa');
    const findOrder=zleceniaModels
  .find({data_otrzymania : {$gte:body.od, $lte: body.do}})
  .sort({data_otrzymania :body.howSort})
  ;
  findOrder.exec((err,data)=>{  
    data.forEach(element=> {
      nowaData.push(dataChanger(element))
    });
    res.render('news',{title:'Złożone zlecenia',data,nowaData})
  });
  }else if(body.filtr==='WhoGetIt'){
    console.log('dupa');
    const findOrder=zleceniaModels
  .find({data_otrzymania : {$gte:body.od, $lte: body.do}})
  .sort({whoAdd :body.howSort})
  ;
  findOrder.exec((err,data)=>{  
    data.forEach(element=> {
      nowaData.push(dataChanger(element))
    });
    res.render('news',{title:'Złożone zlecenia',data,nowaData})
  });
  }else if(body.filtr==='price'){
    console.log('dupa');
    const findOrder=zleceniaModels
  .find({data_otrzymania : {$gte:body.od, $lte: body.do}})
  .sort({cena_brutto :body.howSort})
  ;
  findOrder.exec((err,data)=>{  
    data.forEach(element=> {
      nowaData.push(dataChanger(element))
    });
    res.render('news',{title:'Złożone zlecenia',data,nowaData})
  });
  }
  
  
  return;
});

// służy do usówania rzeczy z bazy danych
router.get('/delete/:id/:zlecajacy/:cena_brutto',(req,res)=>{
  console.log(req.params);
  const body=req.params
  console.log("czy jesteś wielkim adminem ?"+req.session.grandAdmin);
  if(req.session.grandAdmin===1){
    zleceniaModels.findByIdAndDelete(req.params.id,(err)=>{
      res.render('index', { title: 'Strona głowna ',RejestrationSucess:`udało się usunąć zlecenie o id: ${body.id} Zlecenie było złożone przez : ${body.zlecajacy} cena tego zlecenia to: ${body.cena_brutto}` });
    })
  }else{
    res.render('index', { title: 'Strona głowna ',RejestrationSucess:`Nie udało się usnąć zlecenia o id: ${body.id} Bo nie masz do tego uprawnień, jesteś zalogowany jako: "${req.session.whoIsLoged}" Zlecenie jest złożone przez:  "${body.zlecajacy} "a cena zlecenia wynosi: ${body.cena_brutto}` }
  )}
 
})
router.get('/edit/:id',(req,res)=>{

  console.log(req.params);
  zleceniaModels.findById(req.params.id,(err,data)=>{
      console.log(data);
      // data.data_otrzymania=toString(data.data_otrzymania)
      newBodyForData={
          data_otrzymania:dataChanger2(data.data_otrzymania),
          data_zlecenia:dataChanger2(data.data_zlecenia),
          data_wyk_swiadectwa:dataChanger2(data.data_wyk_swiadectwa)
      }
      // console.log(newBodyForData.d_otrzymania);
      // console.log(newBodyForData.d_otrzymania);
      res.render('admin/zlecenie_mini_edit',{title:'Edytuj zlecenie',body:data,errors:{},newBodyForData});
  })
  function isPayed(data){
    if(data==='tak') return true;
    else return false;
  
  }
router.post('/edit/:id',(req,res)=>{
  console.log(req.params);
  console.log(req.body);
  const body=req.body
  const Radio_button=isPayed(body.oplacono)
  // console.log(Radio_button);
  const vat=0.23*body.c_brutto;
  const cena_net=body.c_brutto -  vat;
  // const filter={_id:ObjectId(req.params.id)}
//  console.log(filter._id);
const id=req.params.id
  zleceniaModels.findByIdAndUpdate(id,
    {
    oznaczenie_wejsciowe:body.ozn_wejscia,
    zlecajacy:body.zlecajacy,
    nr_swiadectwa:body.nr_swiadectwa,
    data_otrzymania:body.d_otrzymania,
    platnik_nazwa:body.platnik_nazwa,
    data_zlecenia:body.d_zlecenia,
    data_wyk_swiadectwa:body.d_wyk_swiadectwa,
    oplacono:Radio_button,
    cena_brutto:body.c_brutto,
    cena_netto:cena_net,
    vat:vat,
    whoAdd:req.session.userSignature,},function(err,result){
      if(err)
      {
        console.log(err);
      }else
      {
        console.log("udało się");
        res.redirect('/news')
      }
    });



})

})
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