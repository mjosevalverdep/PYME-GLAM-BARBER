import React from "react";
import SuscripcionesList from "@/components/admin/suscripciones/SuscripcionesList";

const SuscripcionesPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <SuscripcionesList />
    </main>
  </div>
);

export default SuscripcionesPage;
