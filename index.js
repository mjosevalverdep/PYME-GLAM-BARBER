const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://backend_user:backend2024@127.0.0.1:27017/pyme_glambarber', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Servidor corriendo y conectado a MongoDB!');
});

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});