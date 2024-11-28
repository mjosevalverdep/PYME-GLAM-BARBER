const Historial = require('../models/Historial');

exports.create = async (clienteID, serviceID, fecha, empleadoID) => {
  const historial = new Historial({ clienteID, serviceID, fecha, empleadoID });
  await historial.save();
  return historial;
};

exports.findAll = async () => {
  return await Historial.find();
};
