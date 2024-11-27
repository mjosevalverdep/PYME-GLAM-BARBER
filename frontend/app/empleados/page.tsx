"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getEmpleados,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  searchEmpleadoByNombre,
  searchEmpleadoByCorreo,
  searchEmpleadoByTelefono,
  searchEmpleadoByPuesto,
} from "@/services/empleadoApi";
import EmployeeCard from "@/components/empleados/EmployeeCard";
import AddButton from "@/components/empleados/AddButton";
import EmployeeModal from "@/components/empleados/EmployeeModal";
import SearchModal from "@/components/empleados/SearchModal";

interface Employee {
  id: string;
  nombre: string;
  puesto: string;
  correo: string;
  telefono: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchType, setSearchType] = useState<"nombre" | "correo" | "telefono" | "puesto" | null>(
    null
  );
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

  const handleSaveEmployee = async (employee: {
    nombre: string;
    puesto: string;
    correo: string;
    telefono: string;
  }) => {
    try {
      if (editingEmployee) {
        await updateEmpleado(editingEmployee.id, employee);
        toast.success("Empleado actualizado correctamente.");
      } else {
        await createEmpleado(employee);
        toast.success("Empleado creado correctamente.");
      }
      fetchEmployees();
    } catch (error) {
      toast.error("Error al guardar el empleado.");
    } finally {
      setEditingEmployee(null);
      setShowModal(false);
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

  const handleSearch = async (query: string) => {
    try {
      let data;

      if (searchType === "correo") {
        data = await searchEmpleadoByCorreo(query);
      } else if (searchType === "telefono") {
        data = await searchEmpleadoByTelefono(query);
      } else if (searchType === "puesto") {
        data = await searchEmpleadoByPuesto(query);
      } else if (searchType === "nombre") {
        data = await searchEmpleadoByNombre(query);
      }

      setEmployees(Array.isArray(data) ? data : [data]);
      toast.info(`Resultados para ${searchType}: ${query}`);
    } catch (error) {
      toast.error("Error al buscar empleados.");
    } finally {
      setSearchType(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gestión de Empleados
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSearchType("nombre")}
          >
            Buscar por Nombre
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSearchType("correo")}
          >
            Buscar por Correo
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSearchType("telefono")}
          >
            Buscar por Teléfono
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setSearchType("puesto")}
          >
            Buscar por Puesto
          </button>
          <AddButton
            onClick={() => {
              setEditingEmployee(null);
              setShowModal(true);
            }}
            isOpen={showModal}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={() => {
                setEditingEmployee(employee);
                setShowModal(true);
              }}
              onDelete={() => handleDeleteEmployee(employee.id)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <EmployeeModal
          employee={editingEmployee}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEmployee}
        />
      )}

      {searchType && (
        <SearchModal
          type={searchType}
          onClose={() => setSearchType(null)}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}
