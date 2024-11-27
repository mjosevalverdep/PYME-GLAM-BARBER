const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/', serviceController.createService);
router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);
router.put('/editar/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.get('/search', serviceController.searchServices);

module.exports = router;
