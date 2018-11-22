
var express = require('express');
var Mailgun = require('mailgun-js');
var router = express.Router();
var userdb = require('../Models/common');

var api_key = 'key-b2bad29a3d5eb41ce46070b6a23f80a9';
//Your domain, from the Mailgun Control Panel
var domain = 'sandbox418cd0b38e714c09ba957b31b3a1ab0e.mailgun.org';
//Your sending email address
var from_who = 'sandeepsingh@ucreate.co.in';


router.get('/mailgun', function (req, res, next) {
  res.render('mailgun', { title: ': Eezy :: MailGun :' });
});

//Send email Process 
router.post('/sendmail', function (req, res) {
  var email = req.body.email;
  //pass the api_key and domain to the wrapper
  var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
  var data = {
    from: from_who,
    to: email,
    subject: 'Hello Eezy',
    html: 'Hello, This is a test email, I wanted to test Eezy spicy Mailgun sauce in NodeJS!'
  }
  //Invokes the method to send emails
  mailgun.messages().send(data, function (err, body) {
    if (err) {
      res.render('mailgun', { title: 'mailgun', message: 'got an error: ' + err, style: 'alert-danger' });
      //console.log("got an error: ", err);
    }
    else {
      res.render('mailgun', { title: 'mailgun', message: 'Notification email has been sent on ' + email, style: 'alert-success' });
      //console.log(body);
    }
  });
});

module.exports = router;
