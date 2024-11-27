const Inventario = require('../models/Inventario');

exports.create = async (producto, cantidad, precioUnidad, proveedor) => {
  const inventario = new Inventario({ producto, cantidad, precioUnidad, proveedor });
  await inventario.save();
  return inventario;
};

exports.findAll = async () => {
  return await Inventario.find();
};
