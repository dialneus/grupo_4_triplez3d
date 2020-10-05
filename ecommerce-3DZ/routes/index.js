var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.homePage);

/* GET Modelado page. */
router.get('/modelado',indexController.modelado);

module.exports = router;
