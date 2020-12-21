const express = require('express');
const router = express.Router();
const zleceniaGlownaBaza=require('../models/zleceniaGlownaBaza')

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
router.get('/', (req, res, next)=> {
    console.log(req.query);
    
    zleceniaGlownaBaza.find({},(err,data)=>{
      let dataOtrzymania=[]
      let dataWykonaniaswiadectwa=[]
      let dataPrzekazaniaMiernika=[]
      let Badanie=[]

      data.forEach(element=> {
        dataOtrzymania.push(dataChanger(element.data_otrzymania))
        dataWykonaniaswiadectwa.push(dataChanger(element.data_wyk_swiadectwa))
        dataPrzekazaniaMiernika.push(dataChanger(element.data_przekazania_miernika))
        Badanie.push(obiektBadan(element.Obiekt_bada))

      });
    //   console.log(dataOtrzymania,'data otrzymania');
    //   console.log(dataWykonaniaswiadectwa,'data wykonaia swiadectwa');
    //   console.log(dataPrzekazaniaMiernika,'data przeazania miernika');
      res.render('print', { title: 'Złożone zlecenia ',data,dataOtrzymania,dataWykonaniaswiadectwa,dataPrzekazaniaMiernika,Badanie});
    })
  });

module.exports = router;