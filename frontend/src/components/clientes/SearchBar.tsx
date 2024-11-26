import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
  }
  
  export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
    return (
      <div className="flex justify-center mb-6">
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Buscar..."
          value={value}
          onChange={onChange}
          className="flex-1 px-4 py-2 text-sm text-black bg-white focus:outline-none"
        />
        <button
          onClick={onSearch}
          className="bg-gray-800 text-white px-4 py-2 flex items-center justify-center hover:bg-gray-700 transition"
        >
          <FaSearch />
        </button>
      </div>
    </div>
    );
  }
  