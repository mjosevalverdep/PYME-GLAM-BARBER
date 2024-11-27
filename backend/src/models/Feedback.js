const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    clienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    empleadoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    servicio: { type: String, required: true },
    calificacion: { type: Number, min: 1, max: 5, required: true },
    comentario: { type: String },
    fecha: { type: Date, required: true }
  });
  
const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;