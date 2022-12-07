var express = require('express');
var router = express.Router();

let bbProductsController = require('../controllers/bb_productsController')
/* GET home page. */
router.get('/', bbProductsController.getAllBBProducts);

router.get('/add-product', bbProductsController.getBBProductCreatePage)
router.get('/edit-product', bbProductsController.editBBProductPage)

router.patch('/bb-products', bbProductsController.editBBProduct)
router.post('/bb-products', bbProductsController.createBBProduct)


module.exports = router;
