"use client";

import { useState } from "react";

interface CitaModalProps {
  cita: {
    clienteId: string;
    servicioId: string;
    fecha: string;
    estado: string;
    notas?: string;
  } | null;
  onClose: () => void;
  onSave: (cita: {
    clienteId: string;
    servicioId: string;
    fecha: string;
    estado: string;
    notas?: string;
  }) => void;
}

export default function CitaModal({ cita, onClose, onSave }: CitaModalProps) {
  const [clienteId, setClienteId] = useState(cita?.clienteId || "");
  const [servicioId, setServicioId] = useState(cita?.servicioId || "");
  const [fecha, setFecha] = useState(cita?.fecha || "");
  const [estado, setEstado] = useState(cita?.estado || "programada");
  const [notas, setNotas] = useState(cita?.notas || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCita = {
      clienteId,
      servicioId,
      fecha,
      estado,
      notas,
    };
    onSave(newCita);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{cita ? "Editar Cita" : "Agregar Cita"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            placeholder="ID del Cliente"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            value={servicioId}
            onChange={(e) => setServicioId(e.target.value)}
            placeholder="ID del Servicio"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="programada">Programada</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Notas"
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition">
              Cancelar
            </button>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
