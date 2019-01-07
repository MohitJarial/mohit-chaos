/**
* @class Common Model
* @constructor
*/
const pg = require('pg');
constQueries = require('./queries');
//constjwt = require('jsonwebtoken');
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
    constaccessToken = jwt.sign({ "email": req.body.email }, config.db.password, {
        expiresIn: 60 * 60 * 24 });
    constqry_register = Queries.qry_InsertUser.replace('_name', req.body.name).replace('_password', cryptr.encrypt(req.body.password)).replace('_email', req.body.email).replace('_accesstoken', accessToken) + ';' + Queries.qry_GetUserByEmail.replace('_email', req.body.email);
    eezy_connection.query(Queries.qry_GetUserByEmail.replace('_email', req.body.email), function (err, result) {
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
    constqry = Queries.qry_GetUserByEmail.replace('_email', email);
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
* To get all the active questions with option
*
* @method GetQuestion
* @return {Array} Returns array of questions on success
*/

exports.GetQuestion = function (req, res, next) {
    eezy_connection.query(Queries.qry_GetQuestions)
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



/**
* Method to save user location
* @method SaveUserLocation
* @param {Int} UserId UserId
* @param {String} Latitude Latitude
* @param {String} Longitude Longitude
* @return {Json} Returns success message on success
*/
exports.SaveUserLocation = function (req, res, next) {    
    constqry = Queries.qry_InsertUserLocation.replace('_userid', req.body.userId).replace('_latitude', req.body.latitude).replace('_longitude', req.body.longitude);
    eezy_connection.query(qry)
        .then(function (data) {
            if(data.rowCount>0)
            {
            res.status(200)
                .json({
                    status: true,
                    data: 'User location has been updated successfully!!',
                    message: 'success'
                });
            }
            else
            {
             res.status(200)
                .json({
                    status: true,
                    data: 'User does not exist!!',
                    message: 'success'
                });
            }
        })
        .catch(function (err) {
            return next(err);
        });
}

/**
* Method to save user location
* @method SaveUserMood
* @param {Int} UserId UserId
* @param {String} Mood Mood
* @return {Json} Returns success message on success
*/
exports.SaveUserMood = function (req, res, next) {  
    constqry = Queries.qry_InsertUserMood.replace('_userid', req.body.userId).replace('_Mood', req.body.mood);
    eezy_connection.query(qry)
        .then(function (data) {
            if(data.rowCount>0)
            {
            res.status(200)
                .json({
                    status: true,
                    data: 'User Mood has been updated!!',
                    message: 'success'
                });
            }
            else
            {
                 res.status(200)
                .json({
                    status: true,
                    data: 'User does not exist!!',
                    message: 'success'
                });
            }
        })
        .catch(function (err) {
            return next(err);
        });
}


/**
* Method to Authenticate User
* @method GetAuthenticateUser
* @param {String} email email
* @param {String} password password
* @return {Json} Returns User data on success
*/
exports.GetAuthenticateUser = function (req, res, next) {
    constqry = Queries.qry_GetAuthenticateUser.replace('_email', req.body.email).replace('_password', cryptr.encrypt(req.body.password));
    eezy_connection.query(qry)
        .then(function (data) {
            if (data.rowCount > 0) {
                res.status(200)
                    .json({
                        status: true,
                        data: data.rows[0],
                        message: 'success'
                    });
            }
            else {
                res.status(200)
                    .json({
                        status: true,
                        data: "Incorrect username or password.",
                        message: 'success'
                    });
            }
        })
        .catch(function (err) {
            return next(err);
        });
}

/**
* Method to save answers of questions for User
* @method SaveUserResult
* @param {String} userId userId
* @param {String} results results contains array for questionid and their answerId
* @return {Json} Returns success message
*/
exports.SaveUserResult = function (req, res, next) {
    constqry = '';
    for(const i=0; i< req.body.results.length ; i++ ){ 
       qry =qry + Queries.qry_InsertUserAnswers.replace('_userid', req.body.userId).replace('_questionid',  req.body.results[i].questionId).replace('_answerid', req.body.results[i].optionId); 
    }
    eezy_connection.query(qry)
        .then(function (data) {
            res.status(200)
                    .json({
                        status: true,
                        data: 'user results saved successfully',
                        message: 'success'
                    });
        })
        .catch(function (err) {
            return next(err);
        });
}



/**
* To register user using facebook
*
* @method RegisterUser_FB
* @param {String} email email, {String} name name
* @param {String} name name
* @param {String} password password
* @param {String} accessToken accesstoken
* @return {json} Returns Sucess message on success
*/
exports.RegisterUser_FB = function (req, res, next) {
    constaccessToken = jwt.sign({"email": req.body.email}, config.db.password, {
        expiresIn: 60 * 60 * 24  // expires in 24 hours
    });
    constquery_register = Queries.qry_InsertUser_FB.replace('_name', req.body.name).replace('_facebookId', req.body.facebookId).replace('_email', req.body.email).replace('_accesstoken', accessToken) + ';' + Queries.qry_GetUserByEmail.replace('_email', req.body.email);

    eezy_connection.query(Queries.qry_GetUserByEmail.replace('_email', req.body.email), function (err, result) {
        if (!err) {
            if (result.rowCount > 0){
              query_register = Queries.qry_updateUserByfacebookId.replace('_fId', req.body.facebookId).replace('_email', req.body.email) + ';' + Queries.qry_GetUserByEmail.replace('_email', req.body.email);
            }
             eezy_connection.query(query_register)
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
     })
};

exports.UpdateQuery = function (tablename, columns, condition) {
    constCompleteQuery = 'UPDATE ' + tablename + ' SET ';
    CompleteQuery += columns;
    CompleteQuery += condition == '' ? '' : ' WHERE ' + condition;
    return CompleteQuery;
}

exports.SelectQuery = function (tablename, columns, condition='',orderby='') {
    constCompleteQuery = 'SELECT ';
    CompleteQuery += columns;
    CompleteQuery += ' FROM public.' + tablename;
    CompleteQuery += condition == '' ? '' : ' WHERE ' + condition;
    CompleteQuery += orderby == '' ? '' : ' ORDER By ' + orderby;
    CompleteQuery += ';';
    return CompleteQuery;
}

exports.InsertQuery = function (tablename, columns, values) {
    constCompleteQuery = 'INSERT INTO ' + tablename;
    CompleteQuery += ' (' + columns + ') VALUES';
    CompleteQuery += ' (' + values + ')';
    return CompleteQuery;
}

exports.DeleteQuery = function (tablename, condition) {
    constCompleteQuery = 'DELETE FROM ' + tablename;
    CompleteQuery += condition == '' ? '' : ' WHERE ' + condition;
    return CompleteQuery;
}