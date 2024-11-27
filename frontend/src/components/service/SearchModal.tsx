import { useState } from "react";

interface SearchModalProps {
  type: "nombre" | "id";
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
    nombre: "Buscar por nombre (e.g., Corte de cabello)",
    id: "Buscar por ID (e.g., 648abc123def456789ghijk)",
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
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-400 text-white px-6 py-3 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-gray-800 text-white px-6 py-3 rounded"
            onClick={handleSubmit}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
