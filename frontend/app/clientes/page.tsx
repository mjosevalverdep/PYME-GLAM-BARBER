"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getClientes,
  createCliente,
  deleteCliente,
  searchClienteByNombre,
  getTotalClientes,
} from "@/services/clienteApi";
import ClientCard from "@/components/clientes/ClientCard";
import SearchBar from "@/components/clientes/SearchBar";
import AddButton from "@/components/clientes/AddButton";
import ClientModal from "@/components/clientes/ClientModal";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<any>(null);
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

  const handleSearch = async () => {
    try {
      const data = await searchClienteByNombre(searchQuery);
      setClients(data);
      toast.info("Búsqueda completada.");
    } catch (error) {
      toast.error("Error al buscar clientes.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gestión de Clientes
        </h1>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <div className="flex justify-center mb-6">
          <AddButton onClick={() => setShowModal(true)} isOpen={showModal} />
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

        {showModal && (
          <ClientModal
            client={null}
            onClose={() => setShowModal(false)}
            onSave={(newClient) => {
              handleCreateClient(newClient);
            }}
          />
        )}

        {editingClient && (
          <ClientModal
            client={editingClient}
            onClose={() => setEditingClient(null)}
            onSave={(updatedClient) => {
              fetchClients();
              setEditingClient(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
