const Encuesta = require('../models/Encuesta');

exports.createEncuesta = async (req, res) => {
  const { titulo, preguntas, respuestas } = req.body;

  try {
    const nuevaEncuesta = new Encuesta({ titulo, preguntas, respuestas });
    await nuevaEncuesta.save();
    res.status(201).json(nuevaEncuesta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEncuestas = async (req, res) => {
  try {
    const encuestas = await Encuesta.find();
    res.status(200).json(encuestas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
