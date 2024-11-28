const Cliente = require('../models/Cliente');

exports.crearCliente = (data) => new Cliente(data).save();

exports.obtenerClientes = () => Cliente.find();

exports.actualizarCliente = (id, data) => Cliente.findByIdAndUpdate(id, data, { new: true });

exports.eliminarCliente = (id) => Cliente.findByIdAndDelete(id);

exports.buscarPorNombre = (nombre) => Cliente.find({ nombre: { $regex: nombre, $options: 'i' } });

exports.obtenerClienteById = (id) => Cliente.findById(id);