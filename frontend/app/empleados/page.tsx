"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getEmpleados,
  createEmpleado,
  deleteEmpleado,
  searchEmpleadoByNombre,
  searchEmpleadoByCorreo,
  searchEmpleadoByTelefono,
  searchEmpleadoByPuesto,
  getTotalEmpleados,
} from "@/services/empleadoApi";
import EmployeeCard from "@/components/empleados/EmployeeCard";
import SearchBar from "@/components/empleados/SearchBar";
import AddButton from "@/components/empleados/AddButton";
import EmployeeModal from "@/components/empleados/EmployeeModal";

interface Employee {
  id: string;
  nombre: string;
  puesto: string;
  correo: string;
  telefono: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmpleados();
      const formattedData = data.map((employee: any) => ({
        id: employee._id,
        nombre: employee.nombre,
        puesto: employee.puesto,
        correo: employee.correo,
        telefono: employee.telefono,
      }));
      setEmployees(formattedData);
    } catch (error) {
      toast.error("Error al obtener los empleados.");
    }
  };

  const handleCreateEmployee = async (employee: {
    nombre: string;
    puesto: string;
    correo: string;
    telefono: string;
  }) => {
    try {
      await createEmpleado(employee);
      setShowForm(false);
      fetchEmployees();
      toast.success("Empleado creado correctamente.");
    } catch (error) {
      toast.error("Error al crear el empleado.");
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await deleteEmpleado(id);
      fetchEmployees();
      toast.success("Empleado eliminado correctamente.");
    } catch (error) {
      toast.error("Error al eliminar el empleado.");
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== "") {
        if (searchQuery.includes("@")) {
          const data = await searchEmpleadoByCorreo(searchQuery);
          setEmployees(data);
          toast.info(`Buscando por correo: ${searchQuery}`);
        } else if (searchQuery.length === 10 && !isNaN(Number(searchQuery))) {
          const data = await searchEmpleadoByTelefono(searchQuery);
          setEmployees(data);
          toast.info(`Buscando por teléfono: ${searchQuery}`);
        } else if (searchQuery.trim().length > 0) {
          const data = await searchEmpleadoByNombre(searchQuery);
          setEmployees(data);
          toast.info(`Buscando por nombre: ${searchQuery}`);
        }
      } else {
        fetchEmployees();
        toast.info("Mostrando todos los empleados.");
      }
    } catch (error) {
      toast.error("Error al buscar empleados.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gestión de Empleados
        </h1>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <div className="flex justify-center mb-6">
          <AddButton onClick={() => setShowForm(!showForm)} isOpen={showForm} />
        </div>

        {showForm && (
          <div className="mb-6 bg-white rounded shadow p-6">
            <EmployeeModal
              employee={editingEmployee}
              onClose={() => setEditingEmployee(null)}
              onSave={handleCreateEmployee}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={() => setEditingEmployee(employee)}
              onDelete={() => handleDeleteEmployee(employee.id)}
            />
          ))}
        </div>

        {editingEmployee && (
          <EmployeeModal
            employee={editingEmployee}
            onClose={() => setEditingEmployee(null)}
            onSave={() => {
              fetchEmployees();
              setEditingEmployee(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
