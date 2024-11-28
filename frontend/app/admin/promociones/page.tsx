import React from "react";
import PromocionList from "@/components/admin/promocion/PromocionList";

const PromocionPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <PromocionList />
    </main>
  </div>
);

export default PromocionPage;
