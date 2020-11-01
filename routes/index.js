const express = require('express');
const router = express.Router();
// nie moge zrefraktoryzwoac require bo musiałby uzyc buuble i skonfigurowa=ny webpack od wesji 12 można używac import i exporta w plikach !
/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});
//patrametr typu next bedzie niby pomijał !
// get onacza z eprzychwytuje typ get? to ma sens!
// aby wywołac metode typu post słuy do teog np formu;larz
// wysyłajac post na get bedzi ebłda 404 !

// body w req nie ma uzywjac req ! 
// poarametry przesyąłja get sie uzywa ! 
// formularz bedziemy uzywac z body !
module.exports = router;
