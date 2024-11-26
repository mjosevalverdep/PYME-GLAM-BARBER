import Card from './Card';

export default function HomeMain() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full mt-6">
      <Card href="/services" title="Servicios" description="Gestiona los servicios ofrecidos." />
      <Card href="/clientes" title="Clientes" description="Administra la información de los clientes." />
      <Card href="/empleados" title="Empleados" description="Gestiona a los empleados y sus roles." />
      <Card href="/citas" title="Citas" description="Consulta y gestiona las citas programadas." />
    </main>
  );
}
