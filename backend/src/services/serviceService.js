const Service = require('../models/Service');

exports.create = async (name, category, price) => {
  const service = new Service({ name, category, price });
  await service.save();
  return service;
};

exports.findByCategory = async (category) => {
  return await Service.find({ category });
};
