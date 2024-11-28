const Empleado = require('../models/Empleado');
const empleadoService = require('../services/empleadoService');

exports.crearEmpleado = async (req, res) => {
    try {
        const { nombre, correo, telefono, rol, puesto, password } = req.body;
        const empleado = await empleadoService.crearEmpleado({ nombre, correo, telefono, rol, puesto, password });
        res.status(201).json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear empleado' });
    }
};

exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await empleadoService.obtenerEmpleados();
        res.json(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
};

exports.actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono, rol, puesto } = req.body;
        const empleado = await empleadoService.actualizarEmpleado(id, { nombre, correo, telefono, rol, puesto });
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar empleado' });
    }
};

exports.eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const mensaje = await empleadoService.eliminarEmpleado(id);
        if (!mensaje) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json({ mensaje });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar empleado' });
    }
};

exports.buscarPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const empleados = await empleadoService.buscarPorNombre(nombre);
        if (empleados.length === 0) {
            return res.status(404).json({ error: 'Empleados no encontrados' });
        }
        res.json(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar empleados por nombre' });
    }
};