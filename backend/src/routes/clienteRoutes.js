const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.post('/', clienteController.crearCliente);
router.get('/', clienteController.obtenerClientes);
router.put('/editar/:id', clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);
router.get('/correo/:correo', clienteController.buscarPorCorreo);
router.get('/nombre/:nombre', clienteController.buscarPorNombre);
router.get('/total', clienteController.contarClientes);
router.get('/telefono/:telefono', clienteController.buscarPorTelefono);

module.exports = router;
