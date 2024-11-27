const Cita = require('../models/Cita');

exports.createCita = async (req, res) => {
  const { clienteId, servicioId, fecha, notas } = req.body;

  try {
    const citaExistente = await Cita.findOne({ servicioId, fecha });
    if (citaExistente) {
      return res.status(400).json({ error: 'El servicio ya está ocupado en ese horario.' });
    }

    const nuevaCita = new Cita({
      clienteId,
      servicioId,
      fecha,
      notas
    });

    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelarCita = async (req, res) => {
  const { id } = req.params;

  try {
    const cita = await Cita.findById(id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    cita.estado = 'cancelada';
    await cita.save();
    res.status(200).json({ message: 'Cita cancelada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
