const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator=require('express-validator');
const expressSession=require('express-session');
const dotenv = require('dotenv');
dotenv.load();

const index = require('./routes/index');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'max', saveUninitialized:false,resave:false }));
app.use('/', index);
app.use('/admin',require('./routes/admin/login'));
app.use('/api',require('./routes/api/users'));

app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/out', express.static(__dirname + '/out'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//const RollbarSecretKey = process.env.ROLLBAR_ACCESS_TOKEN;
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