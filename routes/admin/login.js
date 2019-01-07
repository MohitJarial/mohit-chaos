/**
* @class Login page
*/
const express = require('express');
const router = express.Router();
const users = require('../../Models/users');
/**
 * Login page
* @method Login
*/
router.get('/login', function (req, res, next) {
  res.render('admin/login', { AdminTitle: ':: Admin : Login ::'});
});

router.post('/login', function (req, res, next) {
  users.AuthenticateUser(req.body.username, req.body.password, function (result) {
    if (result.rowCount > 0) {
      res.redirect('/admin/dashboard');
    }
    else {
        res.render('admin/login', { AdminTitle: ':: Admin : Login ::', message: 'Incorrect username or password', style: 'error-msg'});
    }
  });
});

module.exports = router;