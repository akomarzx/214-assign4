const express = require('express')

const router = express.Router();

const bbBasketStatusController = require('../controllers/bb_basketStatusController')

router.get('/', bbBasketStatusController.getBasketStatusPage)
router.get('/create-status', bbBasketStatusController.createBasketStatusPage)

router.post('/', bbBasketStatusController.createBasketStatus)
module.exports = router;