"use client";

import React, { useEffect, useState } from "react";
import { getCitas, deleteCita } from "@/services/citaApi";
import { FaTrash } from "react-icons/fa";

const CitasList: React.FC = () => {
  const [citas, setCitas] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const fetchCitas = async () => {
    try {
      const citasData = await getCitas();
      setCitas(citasData);
    } catch (error) {
      setError("No se pudo obtener las citas");
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const handleCancelCita = async (id: string) => {
    try {
      await deleteCita(id);
      fetchCitas();
    } catch (error) {
      setError("No se pudo cancelar la cita");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Citas</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {citas.map((cita) => (
          <div
            key={cita._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Cliente: {cita.clienteId}
            </h2>
            <p className="text-gray-700">
              <strong>Servicio:</strong> {cita.servicioId}
            </p>
            <p className="text-gray-700">
              <strong>Fecha:</strong> {new Date(cita.fecha).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <strong>Estado:</strong> {cita.estado}
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={() => handleCancelCita(cita._id)}
                className=" text-red-500 px-2 py-1 rounded"
              >
                <FaTrash className="inline-block" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitasList;
