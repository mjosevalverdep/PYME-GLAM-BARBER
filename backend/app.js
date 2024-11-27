const cors = require('cors');
const express = require('express');
const connectDB = require('./src/config/db');
const clienteRoutes = require('./src/routes/clienteRoutes');
const empleadoRoutes = require('./src/routes/empleadoRoutes');
const servicesRoutes = require('./src/routes/serviceRoutes');
const citaRoutes = require('./src/routes/citaRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const inventarioRoutes = require('./src/routes/inventarioRoutes');
const pagoRoutes = require('./src/routes/pagoRoutes');
const promocionRoutes = require('./src/routes/promocionRoutes');
const historialRoutes = require('./src/routes/historialRoutes');
const suscripcionRoutes = require('./src/routes/suscripcionRoutes');
const encuestaRoutes = require('./src/routes/encuestaRoutes');

const app = express(); 

connectDB();

app.use(cors()); 
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/promociones', promocionRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/suscripciones', suscripcionRoutes);
app.use('/api/encuestas', encuestaRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
