import React from "react";
import Header from "@/layouts/home/Header";
import Footer from "@/layouts/home/Footer";
import CitaForm from "@/components/home/citas/CitaForm";

const CitasPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <Header />
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <CitaForm />
    </main>
    <Footer />
  </div>
);

export default CitasPage;
