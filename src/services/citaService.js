const Cita = require('../models/Cita');

exports.create = async (clienteId, servicioId, fecha, notas) => {
  const cita = new Cita({ clienteId, servicioId, fecha, notas });
  await cita.save();
  return cita;
};

exports.findAll = async () => {
  return await Cita.find();
};

exports.findById = async (id) => {
  return await Cita.findById(id);
};

exports.updateEstado = async (id, estado) => {
  return await Cita.findByIdAndUpdate(id, { estado }, { new: true });
};

exports.cancelar = async (id) => {
  return await Cita.findByIdAndUpdate(id, { estado: 'cancelada' }, { new: true });
};

exports.checkDisponibilidad = async (servicioId, fecha) => {
  return await Cita.findOne({ servicioId, fecha });
};
