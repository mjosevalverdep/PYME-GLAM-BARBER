"use client";

import React, { useEffect, useState } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/services/serviceApi";
import { FaEdit, FaTrash } from "react-icons/fa";

const ServiceList = () => {
  const [services, setServices] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    price: 0,
  });
  const [editingService, setEditingService] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError("No se pudo obtener los servicios");
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        const updatedService = await updateService(
          editingService._id,
          newService,
        );
        setServices(
          services.map((service) =>
            service._id === updatedService._id ? updatedService : service,
          ),
        );
      } else {
        const service = await createService(newService);
        setServices([...services, service]);
      }
      setShowModal(false);
      setEditingService(null);
      setNewService({
        name: "",
        category: "",
        price: 0,
      });
    } catch (err) {
      setError("No se pudo guardar el servicio");
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      category: service.category,
      price: service.price,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      setServices(services.filter((service) => service._id !== id));
    } catch (err) {
      setError("No se pudo eliminar el servicio");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Servicios</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => {
            setShowModal(true);
            setEditingService(null);
          }}
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
        >
          Agregar Servicio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              {service.name}
            </h2>
            <p className="text-gray-700">
              <strong>Categoría:</strong> {service.category}
            </p>
            <p className="text-gray-700">
              <strong>Precio:</strong> ${service.price}
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={() => handleEdit(service)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaEdit className="inline-block" />
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash className="inline-block" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              {editingService ? "Editar Servicio" : "Agregar Servicio"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newService.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">
                  Categoría
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newService.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newService.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
                >
                  {editingService ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
