const Service = require('../models/Service');

// Crear servicio
exports.createService = async (req, res) => {
  const { name, category, price } = req.body;

  try {
    const service = new Service({ name, category, price });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los servicios
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener servicio por id
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modificar servicio
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar servicio
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json({ message: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar servicios por nombre o categoría
exports.searchServices = async (req, res) => {
  try {
    const { query } = req.query;
    const services = await Service.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener estadísticas de servicios por categoría
exports.getServiceStats = async (req, res) => {
  try {
    const stats = await Service.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
