const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

router.post('/', citaController.createCita);
router.get('/citas', citaController.getCitas);
router.get('/citas/:id', citaController.getCitaById);
router.put('/citas/:id', citaController.updateEstadoCita);
router.delete('/citas/:id', citaController.cancelarCita);

module.exports = router;
