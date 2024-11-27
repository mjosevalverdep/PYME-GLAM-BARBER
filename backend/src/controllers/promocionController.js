const Promocion = require('../models/Promocion');

exports.createPromocion = async (req, res) => {
  const { nombre, descripcion, validoDesde, validoHasta } = req.body;

  try {
    const nuevaPromocion = new Promocion({ nombre, descripcion, validoDesde, validoHasta });
    await nuevaPromocion.save();
    res.status(201).json(nuevaPromocion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPromociones = async (req, res) => {
  try {
    const promociones = await Promocion.find();
    res.status(200).json(promociones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
