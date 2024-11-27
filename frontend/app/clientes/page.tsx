"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getClientes,
  createCliente,
  deleteCliente,
  searchClienteByNombre,
} from "@/services/clienteApi";
import ClientCard from "@/components/clientes/ClientCard";
import AddButton from "@/components/clientes/AddButton";
import ClientModal from "@/components/clientes/ClientModal";
import SearchModal from "@/components/clientes/SearchModal";

interface Client {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  rol: string;
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchType, setSearchType] = useState<"nombre" | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClientes();
      const formattedData = data.map((client: any) => ({
        id: client._id,
        nombre: client.nombre,
        correo: client.correo,
        telefono: client.telefono,
        rol: client.rol,
      }));
      setClients(formattedData);
    } catch (error) {
      toast.error("Error al obtener los clientes.");
    }
  };

  const handleSearch = async (query: string) => {
    try {
      let data;

      if (searchType === "nombre") {
        data = await searchClienteByNombre(query);
        toast.info(`Resultados para búsqueda por nombre: ${query}`);
      }

      setClients(data);
    } catch (error) {
      toast.error("Error al buscar clientes.");
    } finally {
      setSearchType(null); 
    }
  };

  const handleCreateClient = async (client: {
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
  }) => {
    try {
      await createCliente(client);
      setShowModal(false);
      fetchClients();
      toast.success("Cliente creado correctamente.");
    } catch (error) {
      toast.error("Error al crear el cliente.");
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteCliente(id);
      fetchClients();
      toast.success("Cliente eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el cliente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gestión de Clientes
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSearchType("nombre")}
          >
            Buscar por Nombre
          </button>
          <AddButton
            onClick={() => {
              setEditingClient(null);
              setShowModal(true);
            }}
            isOpen={showModal}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={() => setEditingClient(client)}
              onDelete={() => handleDeleteClient(client.id)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <ClientModal
          client={editingClient}
          onClose={() => setShowModal(false)}
          onSave={(newClient) => {
            handleCreateClient(newClient);
          }}
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
