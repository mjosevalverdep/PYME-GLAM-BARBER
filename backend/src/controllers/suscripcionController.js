const Suscripcion = require('../models/Suscripcion');

exports.createSuscripcion = async (req, res) => {
  const { clienteID, tipo, costo, fechaInicio, fechaFin } = req.body;

  try {
    const nuevaSuscripcion = new Suscripcion({ clienteID, tipo, costo, fechaInicio, fechaFin });
    await nuevaSuscripcion.save();
    res.status(201).json(nuevaSuscripcion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSuscripciones = async (req, res) => {
  try {
    const suscripciones = await Suscripcion.find();
    res.status(200).json(suscripciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
