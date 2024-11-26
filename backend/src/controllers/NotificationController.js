const Notification = require('../models/Notification');
const Cliente = require('../models/Cliente'); // Suponemos que tienes un modelo Cliente

// Crear una notificación
exports.createNotification = async (req, res) => {
  const { clienteID, mensaje, tipo, fechaEnvio } = req.body;
  try {
    const notification = new Notification({ clienteID, mensaje, tipo, fechaEnvio });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener notificaciones por cliente
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ clienteID: req.params.clienteID }).sort({ fechaEnvio: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marcar notificación como leída
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { leido: true }, { new: true });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  exports.scheduleReminder = async (clienteID, citaFecha) => {
    const recordatorio = new Notification({
      clienteID,
      mensaje: `Recuerda que tienes una cita programada para el ${citaFecha}.`,
      tipo: 'recordatorio',
      fechaEnvio: new Date(citaFecha.getTime() - 24 * 60 * 60 * 1000), // 24 horas antes
    });
    await recordatorio.save();
  };
};
