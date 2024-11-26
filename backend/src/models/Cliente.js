const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    telefono: String,
    rol: String,
    password: String,
    creadoEn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cliente', ClienteSchema);
