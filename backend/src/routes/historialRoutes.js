const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController.js');

router.post('/', historialController.createHistorial);
router.get('/', historialController.getHistorial);

module.exports = router;
