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
  res.render('login', { title: 'Logownaie',body:{},errors:{} });
  
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
  console.log(req.body);
  if(req.body.login.length===0||req.body.password.length===0){
    let errors={};
    const body=req.body;
    if(req.body.login.length===0){
      errors={errors:[`Nie podałeś Loginu w formularzu !!`]}
      body.login=''
    }else{
      errors={errors:[`Nie podałeś Hasła w formularzu !!`]}
      
      body.password=''
    }
    res.render('login', { title: 'Logownaie',body,errors });
    return;
  }
  // jak przejdzie dalej to tne warunek bedzie sprawdzany !
  const body=req.body;
  
  // console.log(req.body);
  LoginModels.findOne({ login:body.login},(err,data)=>{
    console.log('osoba ktora sie logje to :',data);
    if(data===null){
      let errors={};
      errors={errors:[`Nie ma takeigo użytkownika!`]}
      body.login=''
      body.password=''
      res.render('login', { title: 'Logownaie',body,errors });
      return;
    }
    if(data.login===body.login && data.password===body.password){
      console.log('zalogowałes sie !');
          req.session.admin=1
          req.session.whoIsLoged=data.login;
          req.session.userSignature=data.signature;
        // console.log(req.body);
        res.redirect('/admin')
    }else if(data.password!==body.password){
      let errors={}
      console.log('hasło jest niepoprawne');
      errors={errors:[`Niepoprawne hasło !`]}
      body.password=''
      res.render('login', { title: 'Logownaie',body,errors});
    } 
    else{
      let errors={};
      errors={errors:[`NIe ma takeigo użytkownika!`]}
      body.login=''
      body.password=''
      res.render('login', { title: 'Logownaie',body,errors });
      
    }
    
  })

})


router.get('/rejestration',(req,res)=>{
  res.render('rejestration',{title:'Rejestracja nowego użytkownika',body:{},errors:{}})
})

router.post('/rejestration',(req,res)=>{
  
const body=req.body
// sprawdzanie cyz przypadkiem nie ma juz takeigo użytkownika !!
LoginModels.find(function (err, kittens) {
  let isUserInBase=false;
  if (err) return console.error(err);
  kittens.forEach((item,index)=>{
    if(body.login===item.login ||body.signature===item.signature){
      isUserInBase=true
      let errors={};
      if(body.login===item.login){
        console.log('istnieje już taki użytkownik');
        errors={errors:[`już istnieje taki użytkownik jak: "${body.login}"`]}
      // body.login=''
      }else{
        console.log('istnieje już taki podpis ');
        errors={errors:[`Ktoś już używa takiego podpisu: "${body.signature}"`]}
        // body.signature=''
      }
      res.render('rejestration',{title:'Dodaj zlecenie',errors,body});
    }})
    if(isUserInBase!==true){
     console.log('sTworze nowego użytkownika !');
      const newsData=new LoginModels({
      login:body.login,
      password:body.password,
      signature:body.signature,
    });

  const errors = newsData.validateSync();
    newsData.save((err)=>{
      console.log(err);
      if(err){
       res.render('rejestration',{title:'Dodaj zlecenie',errors,body});
      return;
    }
  
    });
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
