"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getPagos } from "@/services/pagoApi";

interface Pago {
  _id: string;
  clienteID: string;
  monto: number;
  metodo: string;
}

const PagosList = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const data = await getPagos();
        setPagos(data);
      } catch (error) {
        toast.error("Error al obtener los pagos.");
        console.error("Error:", error);
      }
    };

    fetchPagos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Pagos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {pagos.map((pago, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Cliente: {pago.clienteID}
            </h2>
            <p className="text-gray-700">
              <strong>Monto:</strong> {pago.monto}
            </p>
            <p className="text-gray-700">
              <strong>Metodo:</strong> {pago.metodo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagosList;
