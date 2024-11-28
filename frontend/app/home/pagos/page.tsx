import React from "react";
import Header from "@/layouts/home/Header";
import Footer from "@/layouts/home/Footer";
import PagoForm from "@/components/home/pagos/PagoForm";

const PagoPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <Header />
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <PagoForm />
    </main>
    <Footer />
  </div>
);

export default PagoPage;
