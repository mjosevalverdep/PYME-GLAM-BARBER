import { FaEdit, FaTrash } from "react-icons/fa";

interface ServiceCardProps {
  name: string;
  category: string;
  price: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ServiceCard({ name, category, price, onEdit, onDelete }: ServiceCardProps) {
  return (
    <div className="bg-white text-black shadow-md rounded-lg p-4 text-center hover:shadow-lg transition w-64 mx-auto">
      <h2 className="text-lg font-bold mb-2">{name}</h2>
      <p className="text-sm">Categoría: {category}</p>
      <p className="text-sm">Precio: ${price.toFixed(2)}</p>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={onEdit}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
