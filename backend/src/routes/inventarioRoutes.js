const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

router.post('/', inventarioController.createInventario);
router.get('/', inventarioController.obtenerInventario);
router.put('/editar/:id', inventarioController.updateInventario); 
router.delete('/:id', inventarioController.deleteInventario);

module.exports = router;
