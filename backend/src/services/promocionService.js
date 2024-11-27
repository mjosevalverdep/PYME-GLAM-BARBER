const Promocion = require('../models/Promocion');

exports.create = async (nombre, descripcion, validoDesde, validoHasta) => {
  const promocion = new Promocion({ nombre, descripcion, validoDesde, validoHasta });
  await promocion.save();
  return promocion;
};

exports.findAll = async () => {
  return await Promocion.find();
};
