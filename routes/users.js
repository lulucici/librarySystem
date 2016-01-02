var express = require('express');
var router = express.Router();
var middlewares = require('../middlewares');

/* GET users listing. */
//router.get('/shelf', function(req, res, next) {
//  res.render('users/shelf', {
//
//  //});
//});

router.get('/', function(req, res, next) {
  res.render('users/b_history', {

  });
});

router.get('/a_history', function(req, res, next) {
  res.render('users/a_history', {

  });
});

router.get('/r_history', function(req, res, next) {
  res.render('users/r_history', {

  });
});

router.get('/setting', function(req, res, next) {
  res.render('users/setting', {

  });
});



router.get('/pwchange', function(req, res, next) {
  res.render('users/pwchange', {

  });
});

module.exports = router;
