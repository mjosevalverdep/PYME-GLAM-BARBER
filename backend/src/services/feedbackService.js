const Feedback = require('../models/Feedback');

exports.create = async (clienteID, empleadoID, servicio, calificacion, comentario, fecha) => {
  const feedback = new Feedback({ clienteID, empleadoID, servicio, calificacion, comentario, fecha });
  await feedback.save();
  return feedback;
};

exports.findAll = async () => {
  return await Feedback.find();
};
