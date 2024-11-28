"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getClientes } from "@/services/clienteApi";
import { createEncuesta } from "@/services/encuestaApi";
import { useRouter } from "next/navigation";

interface Cliente {
  _id: string;
  nombre: string;
}

interface Encuesta {
  preguntas: string[];
}

const EncuestaForm: React.FC = () => {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [preguntas, setPreguntas] = useState<string[]>([""]); 
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

    if (!preguntas.length) {
      toast.warn("Debe completar todas las preguntas.");
      setIsSubmitting(false);
      return;
    }

    const nuevaEncuesta: Encuesta = {
      preguntas,  
    };

    try {
      await createEncuesta(nuevaEncuesta);
      toast.success("Encuesta creada exitosamente.");
      router.push("/");  
    } catch (error) {
      toast.error("Error al crear la encuesta.");
      console.error("Error al crear la encuesta:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreguntaChange = (index: number, value: string) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index] = value;
    setPreguntas(newPreguntas);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-lg my-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Crea tu Encuesta</h2>

      <div className="mb-4 text-left">
        <label className="block text-gray-600 mb-2">Preguntas</label>
        {preguntas.map((pregunta, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              value={pregunta}
              onChange={(e) => handlePreguntaChange(index, e.target.value)}
              className="w-full text-black border border-gray-300 rounded px-3 py-2 mb-2"
              placeholder={`Pregunta ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 text-left">
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Crear Encuesta"}
        </button>
      </div>
    </form>
  );
};

export default EncuestaForm;
