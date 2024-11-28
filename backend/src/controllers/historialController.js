const Historial = require('../models/Historial');

exports.createHistorial = async (req, res) => {
  const { clienteID, servicio, fecha, empleadoID } = req.body;

  try {
    const nuevoHistorial = new Historial({ clienteID, servicio, fecha, empleadoID });
    await nuevoHistorial.save();
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHistorial = async (req, res) => {
  try {
    const historial = await Historial.find();
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
