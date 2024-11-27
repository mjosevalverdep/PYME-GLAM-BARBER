const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.post('/', pagoController.createPago);
router.get('/', pagoController.getPagos);

module.exports = router;
