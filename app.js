global.environmentServer = { Production: 'Production', Development: 'Development', Staging: 'Staging' };
require('newrelic');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const rollbar = require("rollbar");
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
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use('/', index);
 app.use('/admin', require('./routes/admin/login'));
// app.use('/api', require('./routes/api/users'));

app.get('/favicon.ico', (req, res)=> {
  res.send(200);
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/out', express.static(__dirname + '/out'));
app.use((req, res, next)=> {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN, { environment: process.env.ENVIRONMENT });
app.use((err, req, res, next) => {
  if (err.status == 404) {
    res.render('404', { layout: null, url: req.url });
  }
  else if (err.status == 500) {
    if (process.env.ENVIRONMENT != environmentServer.Development)
      rollbar.handleError(err, req);
    res.render('500');
  }
  else {
    if (process.env.ENVIRONMENT != environmentServer.Development)
      rollbar.handleError(err, req);
  }
});

module.exports = app;