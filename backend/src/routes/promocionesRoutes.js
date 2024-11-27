const express = require('express');
const router = express.Router();
const promocionController = require('../controllers/promocionController');

router.post('/', promocionController.createPromocion);
router.get('/', promocionController.getPromociones);

module.exports = router;
