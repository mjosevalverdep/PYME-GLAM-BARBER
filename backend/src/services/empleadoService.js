const Empleado = require('../models/Empleado');

exports.crearEmpleado = (data) => new Empleado(data).save();

exports.obtenerEmpleados = () => Empleado.find();

exports.actualizarEmpleado = (id, data) => Empleado.findByIdAndUpdate(id, data, { new: true });

exports.eliminarEmpleado = (id) => Empleado.findByIdAndDelete(id);

exports.buscarPorCorreo = (correo) => Empleado.findOne({ correo });

exports.buscarPorTelefono = (telefono) => Empleado.findOne({ telefono });

exports.buscarPorPuesto = (puesto) => Empleado.find({ puesto: { $regex: puesto, $options: 'i' } });

exports.buscarPorNombre = (nombre) => Empleado.find({ nombre: { $regex: nombre, $options: 'i' } });

exports.contarEmpleados = () => Empleado.countDocuments();
