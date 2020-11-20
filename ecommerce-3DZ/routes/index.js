var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', indexController.homePage);

/* GET Modelado page. */
router.get('/modelado',indexController.modelado);

//Cierre Session:

router.get('/logout', usersController.checkout);

//Ruta al carrito:

router.get('/chart', usersController.carrito);

/* GET nosotros page. */
router.get('/nosotros',indexController.nosotros);

/* GET contacto page. */
router.get('/contacto',indexController.contacto);




module.exports = router;
