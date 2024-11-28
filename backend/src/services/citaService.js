const Cita = require('../models/Cita');

exports.create = async (clienteId, servicioId, fecha, notas) => {
  const cita = new Cita({ clienteId, servicioId, fecha, notas });
  await cita.save();
  return cita;
};

exports.findAll = async () => {
  return await Cita.find();
};

exports.eliminarCita = (id) => Cita.findByIdAndDelete(id);

