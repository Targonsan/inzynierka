const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
  res.render('admin', { title: 'Admin' });
});

module.exports = router;