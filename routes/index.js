var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login.html', function(req, res, next) {
  res.render('login');
});


router.get('/register.html', function(req, res, next) {
  res.render('register');
});

router.get('/itemPage.html', function(req, res, next) {
  res.render('itemPage');
});




module.exports = router;
