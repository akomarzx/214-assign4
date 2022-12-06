var express = require('express');
var router = express.Router();

let bbProductsController = require('../controllers/bb_productsController')
/* GET home page. */
router.get('/', bbProductsController.getAllBBProducts);

router.get('/edit-product', bbProductsController.editBBProductPage)

router.patch('/bb-products', bbProductsController.editBBProduct)

module.exports = router;
