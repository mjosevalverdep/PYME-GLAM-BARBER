const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    telefono: String,
    rol: String,
    puesto: String,
    password: String,
    creadoEn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
