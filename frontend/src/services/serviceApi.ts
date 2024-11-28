const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export const getServices = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener los servicios");
  return response.json();
};

export const createService = async (service: {
  name: string;
  category: string;
  price: number;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error("Error al crear el servicio");
  return response.json();
};

export const updateService = async (
  id: string,
  service: { name: string; category: string; price: number },
) => {
  const response = await fetch(`${API_URL}/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error("Error al actualizar el servicio");
  return response.json();
};

export const deleteService = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el servicio");
  return response.json();
};
