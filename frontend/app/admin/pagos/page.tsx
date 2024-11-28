import React from "react";
import PagosList from "@/components/admin/pagos/PagosList";

const PagosPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <PagosList />
    </main>
  </div>
);

export default PagosPage;
