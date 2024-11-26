const API_URL = 'http://localhost:5000/api/services';

// Obtener todos los servicios
export const getServices = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error('Error al obtener los servicios');
  return response.json();
};

// Crear un servicio
export const createService = async (service: { name: string; category: string; price: number }) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error('Error al crear el servicio');
  return response.json();
};

// Actualizar un servicio
export const updateService = async (id: string, service: { name: string; category: string; price: number }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error('Error al actualizar el servicio');
  return response.json();
};

// Eliminar un servicio
export const deleteService = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el servicio');
  return response.json();
};

// Buscar servicios
export const searchServices = async (query: string) => {
  const response = await fetch(`${API_URL}/search?query=${query}`);
  if (!response.ok) throw new Error('Error al buscar servicios');
  return response.json();
};

// Obtener estadísticas de servicios
export const getServiceStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) throw new Error('Error al obtener estadísticas de servicios');
  return response.json();
};

// Obtener un servicio por ID
export const getServiceById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error(`Error al obtener el servicio con ID: ${id}`);
  return response.json();
};
