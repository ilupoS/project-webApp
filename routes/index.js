var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.get('/register.html', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/itemPage.html', function(req, res, next) {
  res.render('itemPage');
});




module.exports = router;
