const API_URL = `${process.env.NEXT_PUBLIC_API_URL}notificaciones`;

// Crear una notificación
export const createNotification = async (notification: {
  clienteID: string;
  mensaje: string;
  tipo: string;
  fechaEnvio: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notification),
  });
  if (!response.ok) throw new Error('Error al crear la notificación');
  return response.json();
};

// Obtener notificaciones por cliente
export const getNotificationsByCliente = async (clienteID: string) => {
  const response = await fetch(`${API_URL}/cliente/${clienteID}`);
  if (!response.ok) throw new Error('Error al obtener las notificaciones del cliente');
  return response.json();
};

// Marcar notificación como leída
export const markNotificationAsRead = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leido: true }),
  });
  if (!response.ok) throw new Error('Error al marcar la notificación como leída');
  return response.json();
};

// Programar recordatorio para cita
export const scheduleReminder = async (reminder: {
  clienteID: string;
  mensaje: string;
  tipo: string;
  fechaEnvio: string;
}) => {
  const response = await fetch(`${API_URL}/recordatorio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reminder),
  });
  if (!response.ok) throw new Error('Error al programar el recordatorio');
  return response.json();
};
