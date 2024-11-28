"use client";

import React, { useEffect, useState } from "react";
import { getEncuestas } from "@/services/encuestaApi"; 

interface Encuesta {
  _id: string;
  preguntas: string[];
}

const EncuestasList = () => {
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        const data = await getEncuestas();
        setEncuestas(data);
      } catch (err) {
        setError("No se pudo obtener las encuestas");
      }
    };

    fetchEncuestas();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Encuestas</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {encuestas.map((encuesta) => (
          <div
            key={encuesta._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-2">Encuesta {encuesta._id}</h2>
            <ul className="text-gray-700">
              {encuesta.preguntas.map((pregunta, index) => (
                <li key={index} className="mb-2">
                  <strong>{index + 1}. </strong>{pregunta}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncuestasList;
