const mongoose = require('mongoose');

const promocionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    validoDesde: { type: Date, required: true },
    validoHasta: { type: Date, required: true }
});

const Promocion = mongoose.model('Promocion', promocionSchema);
module.exports = Promocion;
