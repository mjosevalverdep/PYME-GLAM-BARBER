const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/notifications`;

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

export const getNotifications = async () => {  
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error('Error al obtener las notificaciones');
  return response.json();
};