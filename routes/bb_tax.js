const express = require('express')

const router = express.Router();
const bbTaxController = require('../controllers/bb_taxController');


router.get('/calculate-tax', bbTaxController.getCalculateTaxPage)

module.exports = router;