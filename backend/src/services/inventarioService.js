const Inventario = require('../models/Inventario');

exports.createInventario = async ({ producto, cantidad, precioUnidad, proveedor }) => {
  if (!producto || !cantidad || !precioUnidad) {
    throw new Error('Faltan campos requeridos');
  }

  const inventario = new Inventario({
    producto,
    cantidad,
    precioUnidad,
    proveedor: proveedor || 'Proveedor desconocido',
  });

  try {
    await inventario.save();
    return inventario;
  } catch (error) {
    throw new Error('Error al guardar en la base de datos');
  }
};


exports.obtenerInventario = () => Inventario.find();

exports.updateInventario = async (id, data) => {
  return await Inventario.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteInventario = async (id) => {
  return await Inventario.findByIdAndDelete(id);
};
