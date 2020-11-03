const express = require('express');
const LoginModels=require('../models/logins')
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
  res.render('admin', { title: 'Strona  Admina',user: req.session.whoIsLoged, signature:req.session.userSignature, });
  //user: req.session.whoIsLoged, signature:req.session.userSignature,
});

router.get('/gej',(req,res)=>{
  LoginModels.find(function (err, kittens) {
    if (err) return console.error(err);
    kittens.forEach((item,index)=>{
      
      console.log(item.login);
    })
  })
})

module.exports = router;