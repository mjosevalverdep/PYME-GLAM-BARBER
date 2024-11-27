"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getServices,
  updateService,
  createService,
  deleteService,
  searchServices,
  getServiceById,
} from "@/services/serviceApi";
import ServiceCard from "@/components/service/ServiceCard";
import AddButton from "@/components/service/AddButton";
import ServiceModal from "@/components/service/ServiceModal";
import SearchModal from "@/components/service/SearchModal";

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchType, setSearchType] = useState<"nombre" | "id" | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      const formattedData = data.map((service: any) => ({
        id: service._id,
        name: service.name,
        category: service.category,
        price: service.price,
      }));
      setServices(formattedData);
    } catch (error) {
      toast.error("Error al obtener los servicios.");
    }
  };

  const handleSearch = async (query: string) => {
    try {
      let data;

      if (searchType === "nombre") {
        data = await searchServices(query);
        toast.info(`Resultados para búsqueda por nombre: ${query}`);
      } else if (searchType === "id") {
        data = await getServiceById(query);
        toast.info(`Resultados para búsqueda por ID: ${query}`);
        data = [data];
      }      

      setServices(data);
    } catch (error) {
      toast.error("Error al buscar servicios.");
    } finally {
      setSearchType(null); 
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleSaveService = async (service: {
    name: string;
    category: string;
    price: number;
  }) => {
    try {
      if (editingService) {
        await updateService(editingService.id, service);
        toast.success("Servicio actualizado correctamente.");
      } else {
        await createService(service);
        toast.success("Servicio creado correctamente.");
      }
      fetchServices();
    } catch (error) {
      toast.error("Error al guardar el servicio.");
    } finally {
      setEditingService(null);
      setShowModal(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteService(id);
      fetchServices();
      toast.success("Servicio eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el servicio.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gestión de Servicios
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSearchType("nombre")}
          >
            Buscar por Nombre
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSearchType("id")}
          >
            Buscar por ID
          </button>
          <AddButton
            onClick={() => {
              setEditingService(null);
              setShowModal(true);
            }}
            isOpen={showModal}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              category={service.category}
              price={service.price}
              onEdit={() => handleEditService(service)}
              onDelete={() => handleDeleteService(service.id)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <ServiceModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveService}
          service={editingService}
        />
      )}

      {searchType && (
        <SearchModal
          type={searchType}
          onClose={() => setSearchType(null)}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}
