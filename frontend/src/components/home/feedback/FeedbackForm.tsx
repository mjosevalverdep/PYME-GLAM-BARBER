"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getClientes } from "@/services/clienteApi";
import { getEmpleados } from "@/services/empleadoApi";
import { getServices } from "@/services/serviceApi"; 
import { createFeedback } from "@/services/feedbackApi";
import { useRouter } from "next/navigation";

interface Cliente {
  _id: string;
  nombre: string;
}

interface Empleado {
  _id: string;
  nombre: string;
}

interface Servicio {
  _id: string;
  name: string;
}

const FeedbackForm: React.FC = () => {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedEmpleado, setSelectedEmpleado] = useState<string>("");
  const [selectedServicio, setSelectedServicio] = useState<string>("");
  const [calificacion, setCalificacion] = useState<number>(5);
  const [comentario, setComentario] = useState<string>("");
  const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0, 16));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const fetchServicios = async () => {
    try {
      const data: Servicio[] = await getServices();
      setServicios(data);
    } catch (error) {
      toast.error("Error al obtener los servicios.");
      console.error("Error al obtener los servicios:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchEmpleados();
    fetchServicios();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedCliente || !selectedEmpleado || !selectedServicio) {
      toast.warn("Debe seleccionar cliente, empleado y servicio.");
      setIsSubmitting(false);
      return;
    }

    try {
      const feedback = {
        clienteID: selectedCliente,
        empleadoID: selectedEmpleado,
        servicio: selectedServicio,
        calificacion,
        comentario,
        fecha,
      };

      await createFeedback(feedback);
      toast.success("Feedback creado exitosamente.");
      router.push("/");
    } catch (error) {
      toast.error("Error al crear el feedback.");
      console.error("Error al crear el feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-lg my-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Deja tu Feedback</h2>

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
        <label htmlFor="empleado" className="block text-gray-600 mb-2">
          Selecciona un Empleado
        </label>
        <select
          id="empleado"
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

      <div className="mb-4 text-left">
        <label htmlFor="servicio" className="block text-gray-600 mb-2">
          Selecciona un Servicio
        </label>
        <select
          id="servicio"
          value={selectedServicio}
          onChange={(e) => setSelectedServicio(e.target.value)}
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Seleccione un servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio._id} value={servicio._id}>
              {servicio.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="calificacion" className="block text-gray-600 mb-2">
          Calificación
        </label>
        <input
          type="number"
          id="calificacion"
          value={calificacion}
          onChange={(e) => setCalificacion(Number(e.target.value))}
          min={1}
          max={5}
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="comentario" className="block text-gray-600 mb-2">
          Comentario (opcional)
        </label>
        <textarea
          id="comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full border text-black border-gray-300 rounded px-3 py-2"
          placeholder="Comentarios adicionales"
        />
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="fecha" className="block text-gray-600 mb-2">
          Fecha
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

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
