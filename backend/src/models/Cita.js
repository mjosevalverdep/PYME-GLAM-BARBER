const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  fecha: { type: Date, required: true },
  estado: { type: String, default: 'programada' },
  notas: { type: String },
}, {
  timestamps: true,
});

const Cita = mongoose.model('Cita', citaSchema);
module.exports = Cita;
