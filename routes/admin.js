const express = require('express');
const LoginModels=require('../models/logins')
const zleceniaModels=require('../models/zlecenia')
const router = express.Router();

router.all('*',(req,res,next)=>{
  if(!req.session.admin){
    res.redirect('login')
  
    return;
  }
  next();
});


router.get('/', (req, res, next)=> {
  console.log(req.session.admin);
  // console.log(dupa);

  // const newsData=new LoginModels({
  //   login:'kamil',
  //   password:'makowski',
  // });
  // newsData.save((err)=>{
  //   console.log(err);
  // });
  res.render('admin/index', { title: 'Strona  Admina',user: req.session.whoIsLoged, signature:req.session.userSignature, });
  //user: req.session.whoIsLoged, signature:req.session.userSignature,
});

// router.get('/gej',(req,res)=>{
//   LoginModels.find(function (err, kittens) {
//     if (err) return console.error(err);
//     kittens.forEach((item,index)=>{
      
//       console.log(item.login);
//     })
//   })
// })

router.get('/zlecenie/add',(req,res)=>{
  res.render('admin/zlecenie-form',{title:'Dodaj zlecenie'});


});

router.get('/mini/add',(req,res)=>{
  res.render('admin/zlecenie_mini',{title:'Dodaj zlecenie',body:{},errors:{}});


});

router.post('/mini/add',(req,res)=>{
  
  const body=req.body;
  console.log('dupa')
  // console.log(body);
  // funkcja sprawdzajaca co się podało w formualrzu w radio buttons
  // console.log(body.oplacono,'to co wykonało się w body.oplacono');
  let b
  console.log('czym ejst b?',b);
  const Radio_button=isPayed(body.oplacono)
  // console.log(Radio_button);
  const vat=0.23*body.c_brutto;
  const cena_net=body.c_brutto -  vat;
  console.log("vat: ",vat,' cena netto: ',cena_net );
// wykonywanie zapisu do naszej bazy danej 
  const zlecenieData=new zleceniaModels({
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
    whoAdd:req.session.userSignature,

  });
  // ewentualne błędy w wvalidacji danych !
 const errors = zlecenieData.validateSync();
//  console.log(errors);
  zlecenieData.save((err)=>{
    console.log(err);
    if(err){
      res.render('admin/zlecenie_mini',{title:'Dodaj zlecenie',errors,body});
      return;
    }
    res.redirect('/admin')
  });
 
  // console.log(body.zlecajacy);
})

function isPayed(data){
  if(data==='tak') return true;
  else return false;

}
module.exports = router;