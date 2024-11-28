import React from "react";
import ClientesList from "@/components/admin/cliente/ClientesList";

const ClientePage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <ClientesList />
    </main>
  </div>
);

export default ClientePage;
