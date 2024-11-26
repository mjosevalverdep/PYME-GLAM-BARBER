import { FaTrash, FaEdit } from "react-icons/fa";

interface Client {
    id: string;
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
  }
  
  interface ClientCardProps {
    client: Client;
    onEdit: () => void;
    onDelete: () => void;
  }
  
  export default function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{client.nombre}</h2>
        <p className="text-gray-600">Correo: {client.correo}</p>
        <p className="text-gray-600">Teléfono: {client.telefono}</p>
        <p className="text-gray-600">Rol: {client.rol}</p>
        <div className="flex justify-center gap-4 mt-4">
        <button onClick={onEdit} className="text-white bg-gray-800 p-2 rounded-full">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-white bg-gray-800 p-2 rounded-full">
          <FaTrash />
        </button>
        </div>
      </div>
    );
  }
  