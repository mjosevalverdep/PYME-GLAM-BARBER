import React from "react";
import EmpleadoList from "@/components/admin/empleado/EmpleadoList";

const ClientePage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <EmpleadoList />
    </main>
  </div>
);

export default ClientePage;
