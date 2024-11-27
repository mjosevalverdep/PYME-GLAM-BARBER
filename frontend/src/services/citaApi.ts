const API_URL = 'http://localhost:9000/api/citas';

// Obtener todas las citas
export const getCitas = async () => {
  const response = await fetch(`${API_URL}/citas`);
  if (!response.ok) throw new Error('Error al obtener las citas');
  return response.json();
};

// Crear una cita
export const createCita = async (cita: {
  clienteId: string;
  servicioId: string;
  fecha: string;
  estado?: string;
  notas?: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cita),
  });
  if (!response.ok) throw new Error('Error al crear la cita');
  return response.json();
};

// Eliminar cita
export const deleteCita = async (id: string) => {
  const response = await fetch(`${API_URL}/citas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar la cita');
  return response.json();
};
