import Card from "./Card";

export default function HomeMain() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full mt-6">
      <Card
        href="/admin/services"
        title="Servicios"
        description="Gestiona los servicios ofrecidos como cortes, tintes y más."
      />
      <Card
        href="/admin/clientes"
        title="Clientes"
        description="Administra la información de tus clientes frecuentes."
      />
      <Card
        href="/admin/empleados"
        title="Empleados"
        description="Gestiona a los empleados y sus horarios."
      />
      <Card
        href="/admin/citas"
        title="Citas"
        description="Consulta y gestiona las citas programadas de la barbería."
      />
      <Card
        href="/admin/feedback"
        title="Opiniones"
        description="Recopila y administra la retroalimentación de los clientes."
      />
      <Card
        href="/admin/inventario"
        title="Inventario"
        description="Administra productos como geles, tintes y herramientas."
      />
      <Card
        href="/admin/promociones"
        title="Promociones"
        description="Configura ofertas y descuentos para los clientes."
      />
      <Card
        href="/admin/suscripciones"
        title="Suscripciones"
        description="Gestiona las suscripciones y membresías de los clientes."
      />
      <Card
        href="/admin/historial"
        title="Historial"
        description="Consulta el historial de servicios realizados."
      />
      <Card
        href="/admin/pagos"
        title="Pagos"
        description="Administra los pagos realizados por los clientes."
      />
      <Card
        href="/admin/notificaciones"
        title="Notificaciones"
        description="Envía recordatorios y mensajes personalizados."
      />
      <Card
        href="/admin/encuestas"
        title="Encuestas"
        description="Crea y gestiona encuestas para conocer la opinión de los clientes."
      />
    </main>
  );
}
