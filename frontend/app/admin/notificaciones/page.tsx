import React from "react";
import NotificationList from "@/components/admin/notificaciones/NotificacionesList";

const NotificacionesPage: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-cover bg-center"
    style={{ backgroundImage: "url('/img/bg.jpg')" }}
  >
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <NotificationList />
    </main>
  </div>
);

export default NotificacionesPage;
