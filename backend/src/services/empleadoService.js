const Empleado = require('../models/Empleado');

exports.crearEmpleado = (data) => new Empleado(data).save();

exports.obtenerEmpleados = () => Empleado.find();

exports.actualizarEmpleado = (id, data) => Empleado.findByIdAndUpdate(id, data, { new: true });

exports.eliminarEmpleado = (id) => Empleado.findByIdAndDelete(id);

exports.buscarPorNombre = (nombre) => Empleado.find({ nombre: { $regex: nombre, $options: 'i' } });

exports.obtenerEmpleadoPorId = (id) => Empleado.findById(id);
