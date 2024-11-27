const Suscripcion = require('../models/Suscripcion');

exports.create = async (clienteID, tipo, costo, fechaInicio, fechaFin) => {
  const suscripcion = new Suscripcion({ clienteID, tipo, costo, fechaInicio, fechaFin });
  await suscripcion.save();
  return suscripcion;
};

exports.findAll = async () => {
  return await Suscripcion.find();
};
