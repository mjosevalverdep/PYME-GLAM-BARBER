import React from "react";
import CitasList from "@/components/admin/citas/CitasList";

const ClientePage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <CitasList />
    </main>
  </div>
);

export default ClientePage;
