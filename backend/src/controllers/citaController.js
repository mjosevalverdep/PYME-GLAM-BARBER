const Cita = require('../models/Cita');
const citaService = require('../services/citaService');

exports.createCita = async (req, res) => {
  const { citaId, servicioId, fecha, notas } = req.body;

  try {
    const citaExistente = await Cita.findOne({ servicioId, fecha });
    if (citaExistente) {
      return res.status(400).json({ error: 'El servicio ya está ocupado en ese horario.' });
    }

    const nuevaCita = new Cita({
      citaId,
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

exports.eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await citaService.eliminarCita(id);
    if (!mensaje) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    res.json({ mensaje });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};