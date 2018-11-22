/**
* These are chat related api's.
* @class Chat Api's'
* @module Chat
*/

var express = require("express");
var router = express.Router();

/**
* inherit common class to call api functions
*/
var DB = require('../../Models/chat');

/**
* Api to chat history
* @method  SaveChatHistory
* @param {integer} userId logged in user
* @param {integer} questionid 
* @param {string} questiontext
* @param {string} replytext 
* @return {Json} Returns success message
*/
router.post('/SaveChatHistory', DB.SaveUserChatHistory);

/**
* Api to get random phrase 
* @method  GetRandomPhrase
* @return {Json} Returns phrase data with success message
*/
router.get('/GetRandomPhrase', DB.GetRandomPhrase);


/**
* Api to chat history
* @method  SaveChatHistory @param {integer} userId logged in user @param {integer} questionid  @param {string} questiontext  @param {string} replytext  @return {Json} Returns success message
*/
router.get('/GetRandomStayingInOption', DB.GetRandomStayingInOption);

module.exports = router;