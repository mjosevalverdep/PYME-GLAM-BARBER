interface Employee {
  nombre: string;
  puesto: string;
  correo: string;
  telefono: string;
}

interface EmployeeModalProps {
  onClose: () => void;
  onSave: (employee: {
    nombre: string;
    puesto: string;
    correo: string;
    telefono: string;
  }) => void;
  employee: Employee | null;
}

export default function EmployeeModal({
  onClose,
  onSave,
  employee,
}: EmployeeModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEmployee = {
      nombre: formData.get("nombre") as string,
      puesto: formData.get("puesto") as string,
      correo: formData.get("correo") as string,
      telefono: formData.get("telefono") as string,
    };
    onSave(newEmployee);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {employee ? "Editar Empleado" : "Agregar Empleado"}
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
            name="nombre"
            defaultValue={employee?.nombre || ""}
            placeholder="Nombre"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300 text-black"
            required
          />
          <input
            type="text"
            name="puesto"
            defaultValue={employee?.puesto || ""}
            placeholder="Puesto"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300 text-black"
            required
          />
          <input
            type="email"
            name="correo"
            defaultValue={employee?.correo || ""}
            placeholder="Correo"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300 text-black"
            required
          />
          <input
            type="tel"
            name="telefono"
            defaultValue={employee?.telefono || ""}
            placeholder="Teléfono"
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
