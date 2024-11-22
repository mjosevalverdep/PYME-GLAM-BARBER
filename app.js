const express = require('express');
const connectDB = require('./src/config/db');
const clienteRoutes = require('./src/routes/clienteRoutes');
const empleadoRoutes = require('./src/routes/empleadoRoutes');
const servicesRoutes = require('./src/routes/servicesRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/services', servicesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
