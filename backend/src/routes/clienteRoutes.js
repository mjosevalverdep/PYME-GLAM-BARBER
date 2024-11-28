const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.post('/', clienteController.crearCliente);
router.get('/', clienteController.obtenerClientes);
router.put('/editar/:id', clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);
router.get('/nombre/:nombre', clienteController.buscarPorNombre);

module.exports = router;
