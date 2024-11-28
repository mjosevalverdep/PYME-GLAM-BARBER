const express = require('express');
const empleadoController = require('../controllers/empleadoController');

const router = express.Router();

router.post('/', empleadoController.crearEmpleado);
router.get('/', empleadoController.obtenerEmpleados);
router.put('/editar/:id', empleadoController.actualizarEmpleado);
router.delete('/:id', empleadoController.eliminarEmpleado);
router.get('/nombre/:nombre', empleadoController.buscarPorNombre);
router.get('/:id', empleadoController.obtenerEmpleadoPorId);

module.exports = router;
