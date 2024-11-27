const Pago = require('../models/Pago');

exports.create = async (clienteID, monto, metodo, fecha) => {
  const pago = new Pago({ clienteID, monto, metodo, fecha });
  await pago.save();
  return pago;
};

exports.findAll = async () => {
  return await Pago.find();
};
