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

/* GET Register page. */
router.get('/productos', function(req, res, next) {
  res.render('productos', { title: 'Catalogo de productos' });
});

/* GET chart page. */
router.get('/carrito', function(req, res, next) {
  res.render('carrito', { title: 'Carrito de Compras 3DZ' });
});


module.exports = router;
