"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getClientes } from "@/services/clienteApi";
import { getSuscripciones } from "@/services/suscripcionApi";
import { createSuscripcion } from "@/services/suscripcionApi";
import { useRouter } from "next/navigation";

interface Cliente {
  _id: string;
  nombre: string;
}

interface Suscripcion {
  clienteID: string;
  tipo: string;
  costo: number;
  fechaInicio: string;
  fechaFin: string;
}

const SuscripcionList = () => {
  const router = useRouter();
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSuscripcion, setNewSuscripcion] = useState<Suscripcion>({
    clienteID: "",
    tipo: "Mensual",
    costo: 0,
    fechaInicio: "",
    fechaFin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuscripciones = async () => {
      try {
        const data = await getSuscripciones();
        setSuscripciones(data);
      } catch (error) {
        toast.error("Error al obtener las suscripciones.");
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

    fetchSuscripciones();
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedCliente || newSuscripcion.costo <= 0 || !newSuscripcion.fechaInicio || !newSuscripcion.fechaFin) {
      toast.warn("Debe completar todos los campos.");
      setIsSubmitting(false);
      return;
    }

    const newSuscripcionWithCliente = { ...newSuscripcion, clienteID: selectedCliente };

    try {
      const suscripcion = await createSuscripcion(newSuscripcionWithCliente);
      setSuscripciones([...suscripciones, suscripcion]);
      setShowModal(false);
      setNewSuscripcion({
        clienteID: "",
        tipo: "Mensual",
        costo: 0,
        fechaInicio: "",
        fechaFin: "",
      });
      toast.success("Suscripción creada correctamente.");
    } catch (error) {
      toast.error("Error al crear la suscripción.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Suscripciones</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
      >
        Agregar Suscripción
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {suscripciones.map((suscripcion, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Cliente: {suscripcion.clienteID}</h2>
            <p className="text-gray-700"><strong>Tipo:</strong> {suscripcion.tipo}</p>
            <p className="text-gray-700"><strong>Costo:</strong> {suscripcion.costo}</p>
            <p className="text-gray-700"><strong>Fecha Inicio:</strong> {suscripcion.fechaInicio}</p>
            <p className="text-gray-700"><strong>Fecha Fin:</strong> {suscripcion.fechaFin}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">Agregar Suscripción</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="clienteID" className="block text-gray-700">Seleccionar Cliente</label>
                <select
                  id="cliente"
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
                <label htmlFor="tipo" className="block text-gray-700">Tipo de Suscripción</label>
                <select
                  name="tipo"
                  id="tipo"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
                  value={newSuscripcion.tipo}
                  onChange={(e) => setNewSuscripcion({ ...newSuscripcion, tipo: e.target.value })}
                >
                  <option value="Mensual">Mensual</option>
                  <option value="Anual">Anual</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="costo" className="block text-gray-700">Costo</label>
                <input
                  type="number"
                  name="costo"
                  id="costo"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
                  value={newSuscripcion.costo}
                  onChange={(e) => setNewSuscripcion({ ...newSuscripcion, costo: Number(e.target.value) })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fechaInicio" className="block text-gray-700">Fecha de Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  id="fechaInicio"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
                  value={newSuscripcion.fechaInicio}
                  onChange={(e) => setNewSuscripcion({ ...newSuscripcion, fechaInicio: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fechaFin" className="block text-gray-700">Fecha de Fin</label>
                <input
                  type="date"
                  name="fechaFin"
                  id="fechaFin"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
                  value={newSuscripcion.fechaFin}
                  onChange={(e) => setNewSuscripcion({ ...newSuscripcion, fechaFin: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Crear Suscripción"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuscripcionList;
