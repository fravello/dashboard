var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname + '/../public/login.html'))
});

router.post('/login', function(req, res, next) {

  if(req.body.txtUsuario == "admin" && req.body.txtPassword == "taitao123"){
    res.redirect('/dashboard');
  }else{
    res.redirect('/');
  }
  
});

router.get('/dashboard', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname + '/../public/dashboard.html'))
});

module.exports = router;
