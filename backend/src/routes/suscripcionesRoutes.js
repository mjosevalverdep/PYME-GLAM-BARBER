const express = require('express');
const router = express.Router();
const suscripcionController = require('../controllers/suscripcionController');

router.post('/', suscripcionController.createSuscripcion);
router.get('/', suscripcionController.getSuscripciones);

module.exports = router;
