var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

/* GET LogIn page. */
router.get('/login', usersController.logIn);

/* GET Register page. */
router.get('/register', usersController.register);

module.exports = router;
