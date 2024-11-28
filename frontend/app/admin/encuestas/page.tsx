import React from "react";
import EncuestasList from "@/components/admin/encuestas/EncuestasList";

const EncuestasPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <EncuestasList />
    </main>
  </div>
);

export default EncuestasPage;
