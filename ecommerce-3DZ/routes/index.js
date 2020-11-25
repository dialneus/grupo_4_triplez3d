var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var usersController = require('../controllers/usersController');
var logMiddleware = require('../middlewares/logMiddleware');

/* GET home page. */
router.get('/', indexController.homePage);

/* GET Modelado page. */
router.get('/modelado',indexController.modelado);

/* GET Admin page. */
router.get('/admin',indexController.admin);


//Cierre Session:

router.get('/logout', usersController.checkout);

/* GET nosotros page. */
router.get('/nosotros',indexController.nosotros);

/* GET contacto page. */
router.get('/contacto',indexController.contacto);

router.get('/header', (req, res) => {
  res.render('partials/headerTest');
})
//-----------------------Ruta al carrito:-------------------

router.get('/chart', logMiddleware, usersController.carrito);
router.post('/addToCart', logMiddleware, usersController.addToCart);
router.post('/deleteFromChart', logMiddleware, usersController.deleteFromChart);
router.post('/purchase',logMiddleware, usersController.purchase);




module.exports = router;
