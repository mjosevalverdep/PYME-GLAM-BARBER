"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getClientes } from "@/services/clienteApi";
import { createPago } from "@/services/pagoApi";
import { useRouter } from "next/navigation";

interface Cliente {
  _id: string;
  nombre: string;
}

interface Pago {
  clienteID: string;
  monto: number;
  metodo: string;
}

const PagoForm: React.FC = () => {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [monto, setMonto] = useState<number>(0);
  const [metodo, setMetodo] = useState<string>("Efectivo"); 
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

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedCliente || monto <= 0 || !metodo) {
      toast.warn("Debe completar todos los campos.");
      setIsSubmitting(false);
      return;
    }

    const nuevoPago: Pago = {
      clienteID: selectedCliente,
      monto,
      metodo,
    };

    try {
      await createPago(nuevoPago);
      toast.success("Pago realizado exitosamente.");
      router.push("/");
    } catch (error) {
      toast.error("Error al realizar el pago.");
      console.error("Error al realizar el pago:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      setMonto(0); 
      toast.warn("El monto no puede ser negativo.");
    } else {
      setMonto(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-lg my-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Realizar Pago</h2>

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
        <label htmlFor="monto" className="block text-gray-600 mb-2">
          Monto del Pago
        </label>
        <input
          type="number"
          id="monto"
          value={monto}
          onChange={handleMontoChange} 
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="metodo" className="block text-gray-600 mb-2">
          Método de Pago
        </label>
        <input
          type="text"
          id="metodo"
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4 text-left">
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Procesando..." : "Realizar Pago"}
        </button>
      </div>
    </form>
  );
};

export default PagoForm;
