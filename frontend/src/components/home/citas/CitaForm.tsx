"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getServices } from "@/services/serviceApi";
import { getClientes } from "@/services/clienteApi";
import { createCita } from "@/services/citaApi";
import { useRouter } from "next/navigation";

interface Service {
  _id: string;
  name: string;
  category: string;
  price: number;
}

interface Cliente {
  _id: string;
  nombre: string;
}

const CitaForm: React.FC = () => {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [notas, setNotas] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchServices = async () => {
    try {
      const data: Service[] = await getServices();
      setServices(data);
    } catch (error) {
      toast.error("Error al obtener los servicios.");
      console.error("Error al obtener los servicios:", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const data: Cliente[] = await getClientes();
      setClientes(data.map((cliente) => ({ ...cliente, id: cliente._id })));
    } catch (error) {
      toast.error("Error al obtener los clientes.");
      console.error("Error al obtener los clientes:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedCliente || !selectedService) {
      toast.warn("Debe seleccionar un cliente y un servicio.");
      setIsSubmitting(false);
      return;
    }

    if (!fecha) {
      toast.warn("Debe seleccionar una fecha y hora.");
      setIsSubmitting(false);
      return;
    }

    try {
      const cita = {
        clienteId: selectedCliente,
        servicioId: selectedService,
        fecha,
        estado: "programada",
        notas,
      };

      await createCita(cita);
      toast.success("Cita creada exitosamente.");
      router.push("/");
    } catch (error) {
      toast.error("Error al crear la cita.");
      console.error("Error al crear la cita:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-lg"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Agendar Cita</h2>

      <div className="mb-4 text-left">
        <label htmlFor="cliente" className="block text-gray-600 mb-2">
          Selecciona un Cliente
        </label>
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

      <div className="mb-4 text-left">
        <label htmlFor="servicio" className="block text-gray-600 mb-2">
          Selecciona un Servicio
        </label>
        <select
          id="servicio"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full border text-black border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Seleccione un servicio</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="fecha" className="block text-gray-600 mb-2">
          Fecha y Hora
        </label>
        <input
          type="datetime-local"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border text-black border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="notas" className="block text-gray-600 mb-2">
          Notas (opcional)
        </label>
        <textarea
          id="notas"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          className="w-full border text-black border-gray-300 rounded px-3 py-2"
          placeholder="Información adicional"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Agendando..." : "Agendar Cita"}
      </button>
    </form>
  );
};

export default CitaForm;
