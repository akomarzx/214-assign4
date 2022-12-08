const express = require('express')

const router = express.Router();
const bbBasketController = require('../controllers/bbBasketsController')

router.get('/', bbBasketController.getBasket)


module.exports = router;