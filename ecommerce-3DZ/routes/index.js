var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenidos a 3DZ impresiones' });
});

/* GET LogIn page. */
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Ingresá a tu cuenta de 3DZ impresiones' });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('users/register', { title: 'Registrate en 3DZ impresiones' });
});

/* GET Product page. */
router.get('/productos', function(req, res, next) {
  res.render('productos', { title: 'Catalogo de productos' });
});

/* GET chart page. */
router.get('/carrito', function(req, res, next) {
  res.render('products/carrito', { title: 'Carrito de Compras 3DZ' });
});

router.get('/formulario', function(req, res, next) {
  res.render('formularioProductos', { title: 'Formulario de productos' });
});


module.exports = router;
