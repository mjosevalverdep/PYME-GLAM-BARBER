import React from "react";
import InventarioList from "@/components/admin/inventario/InventarioList";

const InventarioPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <InventarioList />
    </main>
  </div>
);

export default InventarioPage;
