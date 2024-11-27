const Inventario = require('../models/Inventario');

exports.createInventario = async (req, res) => {
  const { producto, cantidad, precioUnidad, proveedor } = req.body;

  try {
    const nuevoInventario = new Inventario({ producto, cantidad, precioUnidad, proveedor });
    await nuevoInventario.save();
    res.status(201).json(nuevoInventario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInventario = async (req, res) => {
  try {
    const inventario = await Inventario.find();
    res.status(200).json(inventario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
