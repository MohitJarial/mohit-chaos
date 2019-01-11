/**
* @class Users Model
* @module Users
* @constructor
*/

var config = require('../models/config');
var Cryptr = require('cryptr'), cryptr = new Cryptr(process.env.DB_PASSWORD);
const pg = require('pg');


/*----------------connect with postgresql---------------------*/
var dbConnectionConfig = { host:config.db.host, user:config.db.user, password:config.db.password, database:config.db.database, port:config.db.port, ssl:config.db.ssl };
var eezy_connection =  new pg.Client(dbConnectionConfig);
eezy_connection.connect();
