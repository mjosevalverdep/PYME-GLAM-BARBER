const express = require('express');
const router = express.Router();
const encuestaController = require('../controllers/encuestaController');

router.post('/', encuestaController.createEncuesta);
router.get('/', encuestaController.getEncuestas);

module.exports = router;
