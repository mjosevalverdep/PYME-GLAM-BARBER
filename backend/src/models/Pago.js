const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    clienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    monto: { type: Number, required: true },
    metodo: { type: String, required: true },
    fecha: { type: Date, required: true }
});

const Pago = mongoose.model('Pago', pagoSchema);
module.exports = Pago;
