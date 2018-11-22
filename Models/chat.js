/**
* @class Chat Model
* @module Chat
* @constructor
*/

var Queries = require('../Models/Queries');
var config = require('../Models/config');
const pg = require('pg');


/*----------------connect with postgresql---------------------*/
var dbConnectionConfig = { host:config.db.host, user:config.db.user, password:config.db.password, database:config.db.database, port:config.db.port, ssl:config.db.ssl };
var eezy_connection =  new pg.Client(dbConnectionConfig);
eezy_connection.connect();

var CommonFunction = require('../Models/common');

/** 
*To save user chat history 
* @method SaveUserChatHistory
* @param userId,questionid,questiontext,replytext
* @return {Json}
*/
exports.SaveUserChatHistory = function (req, res, next) { 
 var qry = Queries.qry_InsertUserChatHistory.replace('_userid', req.body.userId).replace('_questiontext', req.body.questionText).replace('_replytext', req.body.replyText);
    eezy_connection.query(qry)
        .then(function (data) {
            res.status(200)
                .json({
                    status: true,
                    data: 'User chat saved sucessfully!!',
                    message: 'success'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

/**
* Method to get random row from phrases table
* @method GetRandomPhrase
* @return {Json} Returns row data and success message
*/
exports.GetRandomPhrase = function (req, res, next) {
    eezy_connection.query(Queries.qry_GetRandomPhrase)
        .then(function (data) {
            res.status(200)
                    .json({
                        status: true,
                        data: data.rows[0],
                        message: 'success'
                    });
        })
       .catch(function (err) {
           return next(err);
       });
}


/**
* Method to get random row from phrases table
* @method GetRandomPhrase
* @return {Json} Returns row data and success message
*/
exports.GetRandomStayingInOption = function (req, res, next) {   
   eezy_connection.query(Queries.qry_GetRandomStayingInOption)
       .then(function (data) {
           res.status(200)
               .json({
                   status: true,
                   data: data.rows,
                   message: 'success'
               });
       })
       .catch(function (err) {
           return next(err);
       });
}