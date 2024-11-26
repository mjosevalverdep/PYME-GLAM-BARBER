"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getServices,
  createService,
  deleteService,
  searchServices,
  getServiceStats,
  getServiceById,
} from "@/services/serviceApi";
import ServiceCard from "@/components/service/ServiceCard";
import StatsCard from "@/components/service/StatsCard";
import SearchBar from "@/components/service/SearchBar";
import AddButton from "@/components/service/AddButton";
import ServiceModal from "@/components/service/ServiceModal";

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchServices();
    fetchStats();
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

  const fetchStats = async () => {
    try {
      const data = await getServiceStats();
      setStats(data);
      toast.success("Estadísticas obtenidas correctamente.");
    } catch (error) {
      toast.error("Error al obtener estadísticas de servicios.");
    }
  };

  const handleCreateService = async (service: {
    name: string;
    category: string;
    price: number;
  }) => {
    try {
      await createService(service);
      setShowModal(false);
      fetchServices();
      toast.success("Servicio creado correctamente.");
    } catch (error) {
      toast.error("Error al crear el servicio.");
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

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== "") {
        if (searchQuery.length < 24) {
          const data = await searchServices(searchQuery);
          setServices(data);
          toast.info(`Buscando por nombre: ${searchQuery}`);
        } else {
          const data = await getServiceById(searchQuery);
          setServices([data]);
          toast.info(`Buscando por ID: ${searchQuery}`);
        }
      } else {
        fetchServices();
        toast.info("Mostrando todos los servicios.");
      }
    } catch (error) {
      toast.error("Error al buscar servicios.");
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleSaveService = (service: {
    name: string;
    category: string;
    price: number;
  }) => {
    if (editingService) {
      toast.success("Servicio actualizado correctamente.");
    } else {
      handleCreateService(service);
    }
    setEditingService(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gestión de Servicios
        </h1>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <div className="flex justify-center mb-6">
          <AddButton
            onClick={() => {
              setEditingService(null);
              setShowModal(true);
            }}
            isOpen={showModal}
          />
        </div>

        {stats && <StatsCard stats={stats} />}

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
    </div>
  );
}
