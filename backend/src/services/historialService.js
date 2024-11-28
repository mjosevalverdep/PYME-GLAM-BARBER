const Historial = require('../models/Historial');

exports.create = async (clienteID, servicio, fecha, empleadoID) => {
  const historial = new Historial({ clienteID, servicio, fecha, empleadoID });
  await historial.save();
  return historial;
};

exports.findAll = async () => {
  return await Historial.find();
};
