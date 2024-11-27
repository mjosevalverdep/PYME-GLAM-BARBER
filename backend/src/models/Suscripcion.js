const mongoose = require('mongoose');

const suscripcionSchema = new mongoose.Schema({
    clienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    tipo: { type: String, enum: ['Mensual', 'Anual'], required: true },
    costo: { type: Number, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true }
});

const Suscripcion = mongoose.model('Suscripcion', suscripcionSchema);
module.exports = Suscripcion;