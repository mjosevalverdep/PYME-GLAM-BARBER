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

// Modelos
// Modelo de Cliente
const ClienteSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    telefono: String,
    rol: String,
    password: String,
    creadoEn: { type: Date, default: Date.now },
});
const Cliente = mongoose.model('Cliente', ClienteSchema);

// Modelo de Empleado
const EmpleadoSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    telefono: String,
    rol: String,
    puesto: String,
    password: String,
    creadoEn: { type: Date, default: Date.now },
});
const Empleado = mongoose.model('Empleado', EmpleadoSchema);

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Servidor corriendo y conectado a MongoDB!');
});

// Endpoints Clientes
// ------------------

// Crear un cliente
app.post('/clientes', async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        const clienteGuardado = await nuevoCliente.save();
        res.status(201).json(clienteGuardado);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
});

// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

// Actualizar un cliente
app.put('/clientes/:id', async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(clienteActualizado);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
});

// Eliminar un cliente
app.delete('/clientes/:id', async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
});

// Métodos avanzados para Clientes
// -------------------------------

// Buscar cliente por correo
app.get('/clientes/correo/:correo', async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ correo: req.params.correo });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        console.error('Error al buscar cliente por correo:', error);
        res.status(500).json({ error: 'Error al obtener cliente' });
    }
});

// Buscar cliente por nombre
app.get('/clientes/nombre/:nombre', async (req, res) => {
    try {
        const clientes = await Cliente.find({ nombre: { $regex: req.params.nombre, $options: 'i' } });
        if (clientes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron clientes con ese nombre' });
        }
        res.json(clientes);
    } catch (error) {
        console.error('Error al buscar clientes por nombre:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

// Contar total de clientes
app.get('/clientes/total', async (req, res) => {
    try {
        const totalClientes = await Cliente.countDocuments();
        res.json({ total: totalClientes });
    } catch (error) {
        console.error('Error al contar clientes:', error);
        res.status(500).json({ error: 'Error al obtener total de clientes' });
    }
});

// Buscar cliente por teléfono
app.get('/clientes/telefono/:telefono', async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ telefono: req.params.telefono });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        console.error('Error al buscar cliente por teléfono:', error);
        res.status(500).json({ error: 'Error al obtener cliente' });
    }
});

// Endpoints Empleados
// -------------------

// Crear un empleado
app.post('/empleados', async (req, res) => {
    try {
        const nuevoEmpleado = new Empleado(req.body);
        const empleadoGuardado = await nuevoEmpleado.save();
        res.status(201).json(empleadoGuardado);
    } catch (error) {
        console.error('Error al crear empleado:', error);
        res.status(500).json({ error: 'Error al crear empleado' });
    }
});

// Obtener todos los empleados
app.get('/empleados', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});

// Actualizar un empleado
app.put('/empleados/:id', async (req, res) => {
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empleadoActualizado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(empleadoActualizado);
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
        res.status(500).json({ error: 'Error al actualizar empleado' });
    }
});

// Eliminar un empleado
app.delete('/empleados/:id', async (req, res) => {
    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleadoEliminado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json({ mensaje: 'Empleado eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        res.status(500).json({ error: 'Error al eliminar empleado' });
    }
});

// Métodos avanzados para Empleados
// --------------------------------

// Buscar empleado por correo
app.get('/empleados/correo/:correo', async (req, res) => {
    try {
        const empleado = await Empleado.findOne({ correo: req.params.correo });
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (error) {
        console.error('Error al buscar empleado por correo:', error);
        res.status(500).json({ error: 'Error al obtener empleado' });
    }
});

// Buscar empleado por teléfono
app.get('/empleados/telefono/:telefono', async (req, res) => {
    try {
        const empleado = await Empleado.findOne({ telefono: req.params.telefono });
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (error) {
        console.error('Error al buscar empleado por teléfono:', error);
        res.status(500).json({ error: 'Error al obtener empleado' });
    }
});

// Buscar empleado por puesto
app.get('/empleados/puesto/:puesto', async (req, res) => {
    try {
        const empleados = await Empleado.find({ puesto: { $regex: req.params.puesto, $options: 'i' } });
        if (empleados.length === 0) {
            return res.status(404).json({ error: 'No se encontraron empleados para ese puesto' });
        }
        res.json(empleados);
    } catch (error) {
        console.error('Error al buscar empleados por puesto:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});

// Buscar empleado por nombre
app.get('/empleados/nombre/:nombre', async (req, res) => {
    try {
        const empleados = await Empleado.find({ nombre: { $regex: req.params.nombre, $options: 'i' } });
        if (empleados.length === 0) {
            return res.status(404).json({ error: 'No se encontraron empleados con ese nombre' });
        }
        res.json(empleados);
    } catch (error) {
        console.error('Error al buscar empleados por nombre:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});

// Contar total de empleados
app.get('/empleados/total', async (req, res) => {
    try {
        const totalEmpleados = await Empleado.countDocuments();
        res.json({ total: totalEmpleados });
    } catch (error) {
        console.error('Error al contar empleados:', error);
        res.status(500).json({ error: 'Error al obtener total de empleados' });
    }
});

// Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});