import React from "react";
import ServicesList from "@/components/admin/services/ServiceList";

const ServicesPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <ServicesList />
    </main>
  </div>
);

export default ServicesPage;
