var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rollbar = require('rollbar');
var expressValidator=require('express-validator');
var expressSession=require('express-session');
var dotenv = require('dotenv');
dotenv.load();

var migration = require('./Models/classes/migration_db');

var index = require('./routes/index');
var register = require('./routes/register');
//var mailgun = require('./routes/mailgun');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'max', saveUninitialized:false,resave:false }));
app.use('/', index);
app.use('/',register);
//app.use('/',mailgun);
app.use('/admin',require('./routes/admin/login'));
app.use('/admin',require('./routes/admin/dashboard'));
app.use('/api',require('./routes/api/users'));
app.use('/api',require('./routes/api/chat'));

app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/out', express.static(__dirname + '/out'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var RollbarSecretKey = process.env.ROLLBAR_ACCESS_TOKEN;
//app.use(rollbar.errorHandler(RollbarSecretKey));

//app.listen(6943);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  if(err.status == 404){
    // do nothing
  }
  else{
     // rollbar.reportMessage("Err: "+err.message);    
  }
});

module.exports = app;