"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  const handleCreateCita = () => {
    router.push("/home/citas");
  };

  const handleFeedback = () => {
    router.push("/home/feedback");
  };

  const handleEncuesta = () => {
    router.push("/home/encuestas");
  };

  const handlePagos = () => {
    router.push("/home/pagos");
  };

  const handleHomeRedirect = () => {
    router.push("/");
  };

  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <button
          onClick={handleHomeRedirect}
          className="text-3xl font-bold hover:text-gray-300"
        >
          GlamBarber
        </button>
        <nav className="flex space-x-6">
          <button onClick={handleCreateCita} className="hover:text-gray-300">
            Agendar Cita
          </button>
          <button onClick={handleFeedback} className="hover:text-gray-300">
            Dejar opinión
          </button>
          <button onClick={handleEncuesta} className="hover:text-gray-300">
            Encuesta
          </button>
          <button onClick={handlePagos} className="hover:text-gray-300">
            Realizar Pagos
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
