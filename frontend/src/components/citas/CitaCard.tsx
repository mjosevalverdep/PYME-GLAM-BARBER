import { FaTrash, FaEdit } from "react-icons/fa";

interface CitaCardProps {
  cita: {
    cliente: { nombre: string };
    servicio: { nombre: string };
    fecha: string;
    estado: string;
    id: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function CitaCard({ cita, onEdit, onDelete }: CitaCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{cita.cliente.nombre}</h2>
      <p className="text-gray-600">Servicio: {cita.servicio.nombre}</p>
      <p className="text-gray-600">Fecha: {new Date(cita.fecha).toLocaleString()}</p>
      <p className="text-gray-600">Estado: {cita.estado}</p>
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
