const cron = require('node-cron');
const { scheduleReminder } = require('../controllers/NotificationController');
const Cita = require('../models/Cita'); 

// Programar recordatorios
cron.schedule('0 10 * * *', async () => { // Cada día a las 10 AM
  const citas = await Cita.find({ fecha: { $gte: new Date() } }); // Consultar citas futuras
  citas.forEach(cita => {
    scheduleReminder(cita.clienteID, cita.fecha); // Llama a la función para crear el recordatorio
  });
});
