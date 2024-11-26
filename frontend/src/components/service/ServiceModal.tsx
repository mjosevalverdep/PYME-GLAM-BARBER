interface Service {
    name: string;
    category: string;
    price: number;
  }
  
  interface ServiceModalProps {
    onClose: () => void;
    onSave: (service: { name: string; category: string; price: number }) => void;
    service: Service | null;
  }
  
  export default function ServiceModal({
    onClose,
    onSave,
    service,
  }: ServiceModalProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newService = {
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        price: parseFloat(formData.get("price") as string),
      };
      onSave(newService);
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {service ? "Editar Servicio" : "Agregar Servicio"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              defaultValue={service?.name || ""}
              placeholder="Nombre"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300 text-black"
              required
            />
            <input
              type="text"
              name="category"
              defaultValue={service?.category || ""}
              placeholder="Categoría"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300 text-black"
              required
            />
            <input
              type="number"
              name="price"
              defaultValue={service?.price || ""}
              placeholder="Precio"
              min="0"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300 text-black"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  