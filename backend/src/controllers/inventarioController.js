const inventarioService = require('../services/inventarioService');
const Inventario = require('../models/Inventario');

exports.createInventario = async (req, res) => {
  const { producto, cantidad, precioUnidad, proveedor } = req.body;
  try {
    const inventario = await inventarioService.createInventario({ producto, cantidad, precioUnidad, proveedor });
    res.status(201).json(inventario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear inventario' });
  }
};

exports.obtenerInventario = async (req, res) => {
  try {
    const inventario = await inventarioService.obtenerInventario();
    res.status(200).json(inventario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener inventario' });
  }
};

exports.updateInventario = async (req, res) => {
  const { id } = req.params;
  const { producto, cantidad, precioUnidad, proveedor } = req.body;
  try {
    const inventario = await inventarioService.updateInventario(id, { producto, cantidad, precioUnidad, proveedor });
    if (!inventario) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }
    res.status(200).json(inventario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar inventario' });
  }
};

exports.deleteInventario = async (req, res) => {
  const { id } = req.params;
  try {
    const inventario = await inventarioService.deleteInventario(id);
    if (!inventario) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }
    res.status(200).json({ message: 'Inventario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar inventario' });
  }
};
