const cors = require('cors');
const express = require('express');
const connectDB = require('./src/config/db');
const clienteRoutes = require('./src/routes/clienteRoutes');
const empleadoRoutes = require('./src/routes/empleadoRoutes');
const servicesRoutes = require('./src/routes/serviceRoutes');
const citaRoutes = require('./src/routes/citaRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express(); 

connectDB();

app.use(cors()); 
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
