const Cliente = require('../models/Cliente');
const clienteService = require('../services/clienteService');

exports.crearCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono, rol, password } = req.body;
        const cliente = await clienteService.crearCliente({ nombre, correo, telefono, rol, password });
        res.status(201).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
};

exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await clienteService.obtenerClientes();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

exports.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono, rol } = req.body;
        const cliente = await clienteService.actualizarCliente(id, { nombre, correo, telefono, rol });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
};

exports.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const mensaje = await clienteService.eliminarCliente(id);
        if (!mensaje) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ mensaje });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
};

exports.buscarPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const clientes = await clienteService.buscarPorNombre(nombre);
        if (clientes.length === 0) {
            return res.status(404).json({ error: 'Clientes no encontrados' });
        }
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar clientes por nombre' });
    }
};

