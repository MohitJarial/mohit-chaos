/**
* @class Home page
*/
const express = require('express');
const router = express.Router();

/*
* @return Load html of landing page
*/
router.get('/', (req, res, next)=> {
   res.render('index', { title: 'Hello App Test' });
});

module.exports = router;