const Notification = require('../models/Notification');
const Cliente = require('../models/Cliente'); 

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

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ fechaEnvio: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
