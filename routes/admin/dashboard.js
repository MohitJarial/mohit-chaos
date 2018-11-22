/**
* @class Dashboard
*/
var express = require('express');
var router = express.Router();
var objuser = require('../../Models/users');
/**
 * Dashboard
* @method Dashboard
*/
router.get('/dashboard', function (req, res, next) {
  objuser.GetAllUsersForAdmin (function(result) {
      if(result.rowCount > 0)
      {
      var model = {
                    layout:'/admin/adminLayout.hbs',
                    Users: result.rows,
                    title: 'Dashboard'
                };
        res.render('admin/dashboard', model);
      }
    });
});

module.exports = router;