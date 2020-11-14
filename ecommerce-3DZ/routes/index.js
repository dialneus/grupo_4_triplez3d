var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.homePage);

/* GET Modelado page. */
router.get('/modelado',indexController.modelado);

/* GET nosotros page. */
router.get('/nosotros',indexController.nosotros);

/* GET contacto page. */
router.get('/contacto',indexController.contacto);




module.exports = router;
