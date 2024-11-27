import { useState } from "react";

interface SearchModalProps {
  type: "nombre" | "correo" | "telefono" | "puesto";
  onClose: () => void;
  onSearch: (query: string) => void;
}

export default function SearchModal({ type, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    onSearch(query);
    setQuery("");
    onClose();
  };

  const placeholderMap: Record<string, string> = {
    nombre: "Buscar por nombre (e.g., Juan Pérez)",
    correo: "Buscar por correo (e.g., juan@example.com)",
    telefono: "Buscar por teléfono (e.g., 1234567890)",
    puesto: "Buscar por puesto (e.g., Recepcionista)",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded p-8 shadow-md flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-6 text-black">
          {`Buscar por ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </h2>
        <input
          type="text"
          className="border border-gray-300 rounded w-full px-4 py-3 mb-6 text-black placeholder-black"
          placeholder={placeholderMap[type]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex justify-center gap-4">
          <button
            className="bg-black text-white px-6 py-3 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-black text-white px-6 py-3 rounded"
            onClick={handleSubmit}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
