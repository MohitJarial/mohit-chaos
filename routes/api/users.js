// /**
// * These are user related api's.
// * @class User Api's'
// */

// var express = require("express");
// var router = express.Router();

// /**
// * inherit common class to call api functions
// */
// var DB = require('../..//Models/common');

// /**
// * To check user name existance in database 
// * @method  helloworld
// * @return {json} Returns sucess message on success
// */
// router.get('/helloworld', function (req, res) {
//     res.send(
//         JSON.stringify({
//             data: 'Hello Eezy!',
//             message: "success",
//             success: true
//         })
//     );
// })

// /**
// * Api to register user
// * @method  Register
// * @return {json} Returns sucess message on success
// */
// router.post('/Register', DB.RegisterUser);

// /**
// * Api to get all the questions with options
// * @method  QuestionsApi
// * @return {Array} Returns array of questoins on success
// */
// router.get('/Questions', DB.GetQuestion);

// /**
// * Api to Save User Location
// * @method  SaveUserLocationApi
// * @param {Int} UserId UserId
// * @param {String} Latitude Latitude
// * @param {String} Longitude Longitude
// * @return {Json} Returns success message on success
// */
// router.post('/UserLocation', DB.SaveUserLocation);

// /**
// * Api to Save User Mood
// * @method  SaveUserMoodApi
// * @param {Int} UserId UserId
// * @param {String} Mood Mood
// * @return {Json} Returns success message on success
// */
// router.post('/UserMood', DB.SaveUserMood);

// /**
// * Api to Get Authenticate User
// * @method  GetAuthenticateUserApi
// * @param {String} email email
// * @param {String} password password
// * @return {Json} Returns User data on success
// */
// router.post('/AuthenticateUser', DB.GetAuthenticateUser);

// /**
// * Api to save User's answers
// * @method  SaveUserResult
// * @param {String} userId userId
// * @param {String} results results for questionid with answers id
// * @return {Json} Returns message on success
// */
// router.post('/SaveUserAnswers', DB.SaveUserResult);

// /**
// * Api to register user through facebook
// * @method  RegisterFB
// * @return {json} Returns sucess message on response
// */
// router.post('/RegisterFB', DB.RegisterUser_FB);

// module.exports = router;




