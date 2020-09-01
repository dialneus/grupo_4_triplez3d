var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenidos a 3DZ impresiones' });
});

/* GET LogIn page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Ingresá a tu cuenta de 3DZ impresiones' });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registrate en 3DZ impresiones' });
});

module.exports = router;
