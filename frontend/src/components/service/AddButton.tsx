import { FaPlus, FaTimes } from "react-icons/fa";

interface AddButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function AddButton({ onClick, isOpen }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-700 flex items-center gap-2"
    >
      {isOpen ? <FaTimes /> : <FaPlus />}
      {isOpen ? "Cancelar" : "Agregar Servicio"}
    </button>
  );
}
