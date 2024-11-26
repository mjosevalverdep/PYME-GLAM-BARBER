interface AddButtonProps {
    onClick: () => void;
    isOpen: boolean;
  }
  
  export default function AddButton({ onClick, isOpen }: AddButtonProps) {
    return (
      <button
        onClick={onClick}
        className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-700 transition"
      >
        {isOpen ? "Cancelar" : "Agregar Empleado"}
      </button>
    );
  }
  