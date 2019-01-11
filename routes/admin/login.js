/**
* @class Login page
*/
const express = require('express');
const router = express.Router();

/**
 * Login page
* @method Login
*/
router.get('/login', function (req, res, next) {
  res.render('admin/login', { AdminTitle: ':: Admin : Login ::'});
});

/**
 * Login page
* @method Login
*/
router.get('/error', function (req, res, next) {
 next("No routes found")
});



module.exports = router;