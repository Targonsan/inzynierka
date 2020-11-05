const express = require('express');
const LoginModels=require('../models/logins')
const router = express.Router();

// nie moge zrefraktoryzwoac require bo musiałby uzyc buuble i skonfigurowa=ny webpack od wesji 12 można używac import i exporta w plikach !
/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
  console.log(res.locals.dupa);
});

router.get('/login', (req, res, next)=> {
  res.render('login', { title: 'Logownaie' });
  
});

// router.post('/login',(req,res)=>{
//   // sprawdzanie czy w bazie danych jest taki uzytkownik z hasłem i loginem zgadzjacym sie  z wymaganymi
//   const body=req.body;
//   LoginModels.find(function (err, kittens) {
//     if (err) return console.error(err);
//     kittens.forEach((item,index)=>{
//       if(body.login===item.login &&body.password===item.password){
//         console.log('zalogowałes sie !');
//           req.session.admin=1
//           req.session.whoIsLoged=body.login;
//           req.session.userSignature=item.signature;
         

//         console.log(req.body);
//         res.redirect('/admin')
//       }else{
//         // res.redirect('/')
//         console.log('nie ma takeigo uzytkowika ',req.body);
//         // res.render('login', { title: 'Logownaie',Information:'hasło lub login jest błedny' });
//         // res.redirect('/news')
//       }
     
//     })
//   })
// })
// tu bedzie inaczje napisane !!
router.post('/login',(req,res)=>{
  console.log('ktoś chce się zalogować !!!!!!!!');
  // sprawdzanie czy w bazie danych jest taki uzytkownik z hasłem i loginem zgadzjacym sie  z wymaganymi
  const body=req.body;
  // console.log(req.body);
  LoginModels.findOne({ login:body.login},(err,data)=>{
    console.log('osoba ktora sie logje to :',data);
    if(data.login===body.login && data.password===body.password){
      console.log('zalogowałes sie !');
          req.session.admin=1
          req.session.whoIsLoged=data.login;
          req.session.userSignature=data.signature;
         

        console.log(req.body);
        res.redirect('/admin')
    }else{
      if(data.password!==body.password){
        console.log('hasło jest niepoprawne');
        res.redirect('/login')
      }
    }
  })

})


router.get('/rejestration',(req,res)=>{
  res.render('rejestration',{title:'Rejestracja nowego użytkownika'})
})

router.post('/rejestration',(req,res)=>{
  
const body=req.body
// sprawdzanie cyz przypadkiem nie ma juz takeigo użytkownika !!
LoginModels.find(function (err, kittens) {
  let isUserInBase=false;
  if (err) return console.error(err);
  kittens.forEach((item,index)=>{
    if(body.login===item.login ||body.signature===item.signature){
      console.log('istnieje już taki użytkownik  lub podpis!');
      isUserInBase=true
      res.redirect('/rejestration')
    }})
    if(isUserInBase!==true){
      console.log('sTworze nowego użytkownika !');
    const newsData=new LoginModels({
      login:body.login,
      password:body.password,
      signature:body.signature,
    });
  //  const errors =newsData.validateSync();
  //  console.log(errors);
    newsData.save((err)=>{
      console.log(err);
    });
    res.redirect('/login')
  }
    
      
      
    
    // res.redirect('/login')
  

})


})

  // if(body.login===login && body.password===password){
  //   req.session.admin=1
  //   res.redirect('/admin')
  // }
  // else{
  //   res.redirect('/login')
  // }
  // console.log(req.body);
  


//patrametr typu next bedzie niby pomijał !
// get onacza z eprzychwytuje typ get? to ma sens!
// aby wywołac metode typu post słuy do teog np formu;larz
// wysyłajac post na get bedzi ebłda 404 !

// body w req nie ma uzywjac req ! 
// poarametry przesyąłja get sie uzywa ! 
// formularz bedziemy uzywac z body !
module.exports = router;
