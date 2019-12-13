var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mqtt = require('mqtt');
var mongoose = require('mongoose');
var config = require('./config');
var mqtt_dash = require('./models/mqtt_dash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// mqtt connection
var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client = mqtt.connect(mqttUri);

client.on('connect', function(){
  client.subscribe(config.mqtt.topics);
});

// mongoose connection
var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;
mongoose.connect(mongoUri, {useNewUrlParser: true,  useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', function() {
  console.log("db Connection Successful!");

  client.on('message', function(topic, message){
 
    // a document instance
    var msg = new mqtt_dash({ 
      topic : topic,
      payload : message.toString(),
      date: new Date().getTime()
    });

    // save model to database
    msg.save(function (err, payload) {
      if (err) return console.error(err);
      console.log("saved to mqtt_dash collection.");
    });
  }); 
  
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
