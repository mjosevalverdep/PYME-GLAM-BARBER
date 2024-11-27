const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  const { clienteID, empleadoID, servicio, calificacion, comentario, fecha } = req.body;

  try {
    const nuevoFeedback = new Feedback({ clienteID, empleadoID, servicio, calificacion, comentario, fecha });
    await nuevoFeedback.save();
    res.status(201).json(nuevoFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
