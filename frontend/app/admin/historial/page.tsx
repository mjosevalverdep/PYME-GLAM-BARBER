import React from "react";
import HistorialList from "@/components/admin/historial/HistorialList";

const HistorialPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <HistorialList />
    </main>
  </div>
);

export default HistorialPage;
