import Header from "@/layouts/home/Header";

export default function ClientePage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/img/bg.jpg')" }}
    >
      <Header />

      <main className="flex-grow flex items-center justify-center text-center px-6">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-12">
          <h2 className="text-6xl font-bold text-gray-800 mb-6">
            Bienvenido a GlamBarber
          </h2>
          <p className="text-2xl text-gray-600">
            Descubre nuestros servicios de barbería diseñados para realzar tu
            estilo.
          </p>
        </div>
      </main>

      <footer className="bg-black text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 GlamBarber. Todos los derechos reservados.
          </p>
          <p className="text-gray-400">
            Cortes, estilo y confianza en cada visita.
          </p>
        </div>
      </footer>
    </div>
  );
}
