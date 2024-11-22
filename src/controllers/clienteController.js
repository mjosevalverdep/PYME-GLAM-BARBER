const Cliente = require('../models/Cliente');
const clienteService = require('../services/clienteService');

exports.crearCliente = async (req, res) => {
    try {
        const cliente = await clienteService.crearCliente(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear cliente' });
    }
};

exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await clienteService.obtenerClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

exports.actualizarCliente = async (req, res) => {
    try {
        const cliente = await clienteService.actualizarCliente(req.params.id, req.body);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
};

exports.eliminarCliente = async (req, res) => {
    try {
        const mensaje = await clienteService.eliminarCliente(req.params.id);
        res.json({ mensaje });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
};

exports.buscarPorCorreo = async (req, res) => {
    try {
        const cliente = await clienteService.buscarPorCorreo(req.params.correo);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar cliente' });
    }
};

exports.buscarPorNombre = async (req, res) => {
    try {
        const clientes = await clienteService.buscarPorNombre(req.params.nombre);
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar clientes' });
    }
};

exports.contarClientes = async (req, res) => {
    try {
        const total = await clienteService.contarClientes();
        res.json({ total });
    } catch (error) {
        res.status(500).json({ error: 'Error al contar clientes' });
    }
};

exports.buscarPorTelefono = async (req, res) => {
    try {
        const cliente = await clienteService.buscarPorTelefono(req.params.telefono);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar cliente' });
    }
};
