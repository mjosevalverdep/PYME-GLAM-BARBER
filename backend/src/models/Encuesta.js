const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    preguntas: [{ type: String, required: true }],
    respuestas: [{
        clienteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
        respuestas: [{ type: mongoose.Schema.Types.Mixed, required: true }]
    }],
    creadoEn: { type: Date, default: Date.now }
});

const Encuesta = mongoose.model('Encuesta', encuestaSchema);
module.exports = Encuesta;
