const API_URL = 'http://localhost:5000/api/citas';

export const getCitas = async () => {
  const response = await fetch(`${API_URL}/citas`);
  if (!response.ok) throw new Error('Error al obtener las citas');
  return response.json();
};

export const createCita = async (cita: {
  clienteId: string;
  servicioId: string;
  fecha: string;
  estado: string;
  notas?: string;
}) => {
  const response = await fetch(`${API_URL}/citas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cita),
  });
  if (!response.ok) throw new Error('Error al crear la cita');
  return response.json();
};

export const getCitaById = async (id: string) => {
  const response = await fetch(`${API_URL}/citas/${id}`);
  if (!response.ok) throw new Error('Error al obtener la cita');
  return response.json();
};

export const updateEstadoCita = async (id: string, estado: string) => {
  const response = await fetch(`${API_URL}/citas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado }),
  });
  if (!response.ok) throw new Error('Error al actualizar el estado de la cita');
  return response.json();
};

export const deleteCita = async (id: string) => {
  const response = await fetch(`${API_URL}/citas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar la cita');
  return response.json();
};
