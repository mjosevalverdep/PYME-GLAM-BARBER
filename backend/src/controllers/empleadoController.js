const empleadoService = require('../services/empleadoService');

exports.crearEmpleado = async (req, res) => {
    try {
        const empleado = await empleadoService.crearEmpleado(req.body);
        res.status(201).json(empleado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear empleado' });
    }
};

exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await empleadoService.obtenerEmpleados();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
};

exports.actualizarEmpleado = async (req, res) => {
    try {
        const empleado = await empleadoService.actualizarEmpleado(req.params.id, req.body);
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar empleado' });
    }
};

exports.eliminarEmpleado = async (req, res) => {
    try {
        const mensaje = await empleadoService.eliminarEmpleado(req.params.id);
        res.json({ mensaje });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar empleado' });
    }
};

exports.buscarPorCorreo = async (req, res) => {
    try {
        const empleado = await empleadoService.buscarPorCorreo(req.params.correo);
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar empleado' });
    }
};

exports.buscarPorTelefono = async (req, res) => {
    try {
        const empleado = await empleadoService.buscarPorTelefono(req.params.telefono);
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar empleado' });
    }
};

exports.buscarPorPuesto = async (req, res) => {
    try {
        const empleados = await empleadoService.buscarPorPuesto(req.params.puesto);
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar empleados' });
    }
};

exports.buscarPorNombre = async (req, res) => {
    try {
        const empleados = await empleadoService.buscarPorNombre(req.params.nombre);
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar empleados' });
    }
};

exports.contarEmpleados = async (req, res) => {
    try {
        const total = await empleadoService.contarEmpleados();
        res.json({ total });
    } catch (error) {
        res.status(500).json({ error: 'Error al contar empleados' });
    }
};
