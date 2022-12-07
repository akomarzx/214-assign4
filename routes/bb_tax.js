const express = require('express')

const router = express.Router();
const bbTaxController = require('../controllers/bb_taxController');


router.get('/calculate-tax', bbTaxController.getCalculateTaxPage)

router.post('/calculate-tax', bbTaxController.calculateTax);

module.exports = router;