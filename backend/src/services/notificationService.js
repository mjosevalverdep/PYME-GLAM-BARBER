const cron = require('node-cron');
const { scheduleReminder } = require('../controllers/NotificationController');
const Cita = require('../models/Cita'); 

cron.schedule('0 10 * * *', async () => { 
  const citas = await Cita.find({ fecha: { $gte: new Date() } }); 
  citas.forEach(cita => {
    scheduleReminder(cita.clienteID, cita.fecha); 
  });
});

exports.findAll = async () => {
  return await Notification.find();
};
