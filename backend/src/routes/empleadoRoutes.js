const express = require('express');
const empleadoController = require('../controllers/empleadoController');

const router = express.Router();

router.post('/', empleadoController.crearEmpleado);
router.get('/', empleadoController.obtenerEmpleados);
router.put('/:id', empleadoController.actualizarEmpleado);
router.delete('/:id', empleadoController.eliminarEmpleado);
router.get('/correo/:correo', empleadoController.buscarPorCorreo);
router.get('/telefono/:telefono', empleadoController.buscarPorTelefono);
router.get('/puesto/:puesto', empleadoController.buscarPorPuesto);
router.get('/nombre/:nombre', empleadoController.buscarPorNombre);
router.get('/total', empleadoController.contarEmpleados);

module.exports = router;
