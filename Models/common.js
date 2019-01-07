/**
* @class Common Model
* @constructor
*/
const pg = require('pg');
const queries = require('./queries');
const Cryptr = require('cryptr'), cryptr = new Cryptr(process.env.DB_PASSWORD);
const config = require('../Models/config');

/*----------------connect with postgresql---------------------*/
const dbConnectionConfig = { host:config.db.host, user:config.db.user, password:config.db.password, database:config.db.database, port:config.db.port, ssl:config.db.ssl };
const eezy_connection =  new pg.Client(dbConnectionConfig);
eezy_connection.connect();


/**
* To register user
*
* @method RegisterUser
* @param {String} email email, {String} name name
* @param {String} name name
* @param {String} password password
* @param {String} accesstoken accesstoken
* @return {json} Returns Sucess message on success
*/
exports.RegisterUser = function (req, res, next) {
    const accessToken = jwt.sign({ "email": req.body.email }, config.db.password, {
        expiresIn: 60 * 60 * 24 });
    const qry_register = queries.qry_InsertUser.replace('_name', req.body.name).replace('_password', cryptr.encrypt(req.body.password)).replace('_email', req.body.email).replace('_accesstoken', accessToken) + ';' + queries.qry_GetUserByEmail.replace('_email', req.body.email);
    eezy_connection.query(queries.qry_GetUserByEmail.replace('_email', req.body.email), function (err, result) {
        if (!err) {
            if (result.rowCount > 0){
                    res.status(200)
                       .json({
                           status: true, data: 'Email-Id already exists', message: 'success'
                       });
             }
             else{
                 eezy_connection.query(qry_register)
                 .then(function (data) {
                     res.status(200)
                     .json({
                         status: true, data: data.rows, message: 'success'
                     });
                  })
                  .catch(function (err) {
                       return next(err);
                  });  
             }
        }
    })
};


/**
* To check email existance in database
* @method IsEmailExist
* @param {String} email email
* @return {json} Returns true on success
*/
exports.IsEmailExist = function (email, res) {
    const qry = queries.qry_GetUserByEmail.replace('_email', email);
    eezy_connection.query(qry, function (err, result) {
        if (!err) {
            if (result.rowCount > 0) {
                res.status(200)
                    .json({
                        status: true,
                        data: 'Email-Id already exists',
                        message: 'success'
                    });
            }
        }
    })
}



/**
* My method description.  Like other pieces of your comment blocks, 
* this can span multiple lines.
*
* @method SaveNotification
* @param {String} email email
* @return {Boolean} Returns true on success
*/

exports.SaveNotification = function (req, res, next) {
    eezy_connection.query(Queries.qry_InsertNotification.replace('_email', req.body.email))
        .then(function (data) {
            res.status(200)
                .json({
                    status: true
                });
        })
        .catch(function (err) {
            return next(err);
        });
}