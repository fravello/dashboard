var express = require('express');
var router = express.Router();
var path = require('path');

var mqtt_dash = require('../models/mqtt_dash');

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

router.post('/getHumedad', async function(req, res, next) {

  var fchInicio = req.body.fchInicio + ' 00:00:00';
  var fchTermino = req.body.fchTermino + ' 23:59:59';

  var result = await mqtt_dash.find({
                          payload:{$regex: 'hum'},
                          date: {
                            $gte: fchInicio,
                            $lt: fchTermino
                          }}).sort({$natural:-1}); //.limit(20)

  console.log(result);
  res.send(result);
});

router.post('/getTemperatura', async function(req, res, next) {

  var fchInicio = req.body.fchInicio + ' 00:00:00';
  var fchTermino = req.body.fchTermino + ' 23:59:59';

  var result = await mqtt_dash.find({
                          payload:{$regex: 'tmp'},
                          date: {
                            $gte: fchInicio,
                            $lt: fchTermino
                          }}).sort({$natural:-1}); //.limit(20)

  //console.log(result);
  res.send(result);
  
});

module.exports = router;
