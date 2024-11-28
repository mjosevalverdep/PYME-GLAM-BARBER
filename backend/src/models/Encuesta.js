const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
  preguntas: [{ type: String, required: true }]
});

const Encuesta = mongoose.model('Encuesta', encuestaSchema);
module.exports = Encuesta;
