const Inventario = require('../models/Inventario');

exports.createInventario = async (producto, cantidad, precioUnidad, proveedor) => {
  const inventario = new Inventario({ producto, cantidad, precioUnidad, proveedor });
  await inventario.save();
  return inventario;
};

exports.obtenerInventario = () => Inventario.find();

exports.updateInventario = async (id, data) => {
  return await Inventario.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteInventario = async (id) => {
  return await Inventario.findByIdAndDelete(id);
};
