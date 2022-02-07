var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to home page' });
});

// register page
router.get('/register', function (req, res, next) {
  res.render('auth/register')
})
module.exports = router;
