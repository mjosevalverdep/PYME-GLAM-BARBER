const Cliente = require('../models/Cliente');

exports.crearCliente = (data) => new Cliente(data).save();

exports.obtenerClientes = () => Cliente.find();

exports.actualizarCliente = (id, data) => Cliente.findByIdAndUpdate(id, data, { new: true });

exports.eliminarCliente = (id) => Cliente.findByIdAndDelete(id);

exports.buscarPorCorreo = (correo) => Cliente.findOne({ correo });

exports.buscarPorNombre = (nombre) => Cliente.find({ nombre: { $regex: nombre, $options: 'i' } });

exports.contarClientes = () => Cliente.countDocuments();

exports.buscarPorTelefono = (telefono) => Cliente.findOne({ telefono });
