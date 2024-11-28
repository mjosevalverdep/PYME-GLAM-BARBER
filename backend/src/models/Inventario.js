const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precioUnidad: { type: Number, required: true },
    proveedor: { type: String, default: 'Proveedor desconocido' },
    creadoEn: { type: Date, default: Date.now }
});

const Inventario = mongoose.model('Inventario', inventarioSchema);
module.exports = Inventario;
