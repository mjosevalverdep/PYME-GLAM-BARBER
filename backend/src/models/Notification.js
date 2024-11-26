const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  clienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  mensaje: { type: String, required: true },
  fechaEnvio: { type: Date, required: true },
  tipo: { type: String, enum: ['recordatorio', 'alerta', 'información'], required: true },
  leido: { type: Boolean, default: false }, 
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
