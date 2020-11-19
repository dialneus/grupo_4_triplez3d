var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', indexController.homePage);

/* GET Modelado page. */
router.get('/modelado',indexController.modelado);

//Cierre Session:

router.get('/', usersController.checkout);

//Ruta al carrito:

router.get('/chart', usersController.chart);

module.exports = router;
