"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getClientes } from "@/services/clienteApi";
import { getHistorial, createHistorial } from "@/services/historialApi";
import { getEmpleados } from "@/services/empleadoApi";
import { useRouter } from "next/navigation";

interface Cliente {
  _id: string;
  nombre: string;
}

interface Empleado {
  _id: string;
  nombre: string;
}

interface Historial {
  clienteID: string;
  servicio: string;
  fecha: string;
  empleadoID: string;
}

const HistorialList = () => {
  const router = useRouter();
  const [historiales, setHistoriales] = useState<Historial[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedEmpleado, setSelectedEmpleado] = useState<string>("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newHistorial, setNewHistorial] = useState<Historial>({
    clienteID: "",
    servicio: "",
    fecha: "",
    empleadoID: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await getHistorial();
        setHistoriales(data);
      } catch (error) {
        toast.error("Error al obtener el historial.");
        console.error("Error:", error);
      }
    };

    const fetchClientes = async () => {
      try {
        const data: Cliente[] = await getClientes();
        setClientes(data);
      } catch (error) {
        toast.error("Error al obtener los clientes.");
        console.error("Error al obtener los clientes:", error);
      }
    };

    const fetchEmpleados = async () => {
      try {
        const data: Empleado[] = await getEmpleados();
        setEmpleados(data);
      } catch (error) {
        toast.error("Error al obtener los empleados.");
        console.error("Error al obtener los empleados:", error);
      }
    };

    fetchHistorial();
    fetchClientes();
    fetchEmpleados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !selectedCliente ||
      !selectedEmpleado ||
      !newHistorial.servicio ||
      !newHistorial.fecha
    ) {
      toast.warn("Debe completar todos los campos.");
      setIsSubmitting(false);
      return;
    }

    const newHistorialWithCliente = {
      ...newHistorial,
      clienteID: selectedCliente,
      empleadoID: selectedEmpleado,
    };

    try {
      const historial = await createHistorial(newHistorialWithCliente);
      setHistoriales([...historiales, historial]);
      setShowModal(false);
      setNewHistorial({
        clienteID: "",
        servicio: "",
        fecha: "",
        empleadoID: "",
      });
      toast.success("Historial creado correctamente.");
    } catch (error) {
      toast.error("Error al crear el historial.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Historiales</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
      >
        Agregar Historial
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {historiales.map((historial, index) => {
          const cliente = clientes.find((c) => c._id === historial.clienteID);
          const empleado = empleados.find(
            (e) => e._id === historial.empleadoID,
          );
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                Cliente: {cliente?.nombre || "Desconocido"}
              </h2>
              <p className="text-gray-700">
                <strong>Servicio:</strong> {historial.servicio}
              </p>
              <p className="text-gray-700">
                <strong>Empleado:</strong> {empleado?.nombre || "Desconocido"}
              </p>
              <p className="text-gray-700">
                <strong>Fecha:</strong>{" "}
                {new Date(historial.fecha).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Agregar Historial
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="clienteID" className="block text-gray-700">
                  Seleccionar Cliente
                </label>
                <select
                  id="clienteID"
                  value={selectedCliente}
                  onChange={(e) => setSelectedCliente(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente._id} value={cliente._id}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="servicio" className="block text-gray-700">
                  Servicio
                </label>
                <input
                  type="text"
                  id="servicio"
                  className="w-full text-black border border-gray-300 rounded px-3 py-2"
                  value={newHistorial.servicio}
                  onChange={(e) =>
                    setNewHistorial({
                      ...newHistorial,
                      servicio: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="empleadoID" className="block text-gray-700">
                  Seleccionar Empleado
                </label>
                <select
                  id="empleadoID"
                  value={selectedEmpleado}
                  onChange={(e) => setSelectedEmpleado(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Seleccione un empleado</option>
                  {empleados.map((empleado) => (
                    <option key={empleado._id} value={empleado._id}>
                      {empleado.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="fecha" className="block text-gray-700">
                  Fecha
                </label>
                <input
                  type="date"
                  id="fecha"
                  className="w-full text-black border border-gray-300 rounded px-3 py-2"
                  value={newHistorial.fecha}
                  onChange={(e) =>
                    setNewHistorial({ ...newHistorial, fecha: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cargando..." : "Crear Historial"}
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialList;
