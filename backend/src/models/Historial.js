const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
    clienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    servicio: { type: String, required: true },
    fecha: { type: Date, required: true },
    empleadoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true }
});

const Historial = mongoose.model('Historial', historialSchema);
module.exports = Historial;
