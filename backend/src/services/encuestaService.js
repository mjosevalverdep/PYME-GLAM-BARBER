const Encuesta = require('../models/Encuesta');

exports.create = async (titulo, preguntas, respuestas) => {
  const encuesta = new Encuesta({ titulo, preguntas, respuestas });
  await encuesta.save();
  return encuesta;
};

exports.findAll = async () => {
  return await Encuesta.find();
};
