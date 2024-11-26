import { FaTrash, FaEdit } from "react-icons/fa";

interface EmployeeCardProps {
  employee: {
    id: string;
    nombre: string;
    puesto: string;
    correo: string;
    telefono: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function EmployeeCard({
  employee,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{employee.nombre}</h2>
      <p className="text-gray-600">Puesto: {employee.puesto}</p>
      <p className="text-gray-600">Correo: {employee.correo}</p>
      <p className="text-gray-600">Teléfono: {employee.telefono}</p>
      <div className="mt-4 flex justify-center gap-4">
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
