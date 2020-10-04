var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.homePage);

/* GET chart page. */
router.get('/carrito', indexController.carrito);
router.get('/modelado',indexController.modelado);

module.exports = router;
