var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register',success:req.session.success,errors:req.session.errors});
  req.session.errors=null;
});

router.post('/register', function(req, res, next) {
  req.check('username','Enter user name').isLength({min:1});
  req.check('password','Invalid Password').isLength({min:4}).equals(req.body.confirmpassword);
  var errors=req.validationErrors();
  if(errors){
    req.session.errors=errors;
    req.session.success=false;
  }
  else{
    req.session.success=true;
  }
res.redirect('/register');
});

module.exports = router;
