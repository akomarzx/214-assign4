const express = require('express')
const router = express.Router();
const bbBasketItemController = require('../controllers/bbBasketItemController')

router.post('/', bbBasketItemController.createBasketItem);

module.exports = router;