/**
* @class Home page
*/
var express = require('express');
var router = express.Router();

var commomDB = require('../Models/common');

/**
* @method Index
* @return Load html of landing page
*/
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Hello Eezy' });
});

// router.post('/SaveNotification', function(req, res) {
//   var Email = req.body.email;
//   commomDB.SaveNotification(Email, function(result){
//     res.render(result);
//   });
// });

router.post('/SaveNotification', commomDB.SaveNotification);

module.exports = router;