/**
* @class Users Model
* @module Users
* @constructor
*/

var config = require('../Models/config');
var objcommon = require('../Models/common');
var Cryptr = require('cryptr'), cryptr = new Cryptr(process.env.DB_PASSWORD);
const pg = require('pg');


/*----------------connect with postgresql---------------------*/
var dbConnectionConfig = { host:config.db.host, user:config.db.user, password:config.db.password, database:config.db.database, port:config.db.port, ssl:config.db.ssl };
var eezy_connection =  new pg.Client(dbConnectionConfig);
eezy_connection.connect();


exports.AuthenticateUser = function (username, password, callback) {
    var qry = objcommon.SelectQuery('users', '*', "\"isAdmin\"=true and email ='"+username+ "' and password='" + cryptr.encrypt(password) + "'");
    eezy_connection.query(qry, function (err, result) {
        callback(result);
    })
}


exports.GetAllUsersForAdmin = function (callback) {
    var qry = objcommon.SelectQuery('users', '*','"isAdmin"=false','id desc');
    eezy_connection.query(qry, function (err, result) {
        callback(result);
    })
}