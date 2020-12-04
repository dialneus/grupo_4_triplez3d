var express = require('express');
var router = express.Router();
var productsAPIController = require('../../controllers/api/productsController');

router.get('/', productsAPIController.list);
router.get('/:id', productsAPIController.detail);

module.exports = router;
