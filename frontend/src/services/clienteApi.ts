const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/clientes`;

export const getClientes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los clientes");
  return response.json();
};

export const createCliente = async (cliente: {
  nombre: string;
  correo: string;
  telefono: string;
  rol: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) throw new Error("Error al crear el cliente");
  return response.json();
};

export const updateCliente = async (
  id: string,
  cliente: {
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
  },
) => {
  const response = await fetch(`${API_URL}/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) throw new Error("Error al actualizar el cliente");
  return response.json();
};

export const deleteCliente = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el cliente");
  return response.json();
};

export const searchClienteByNombre = async (nombre: string) => {
  const response = await fetch(`${API_URL}/nombre/${nombre}`);
  if (!response.ok) throw new Error("Error al buscar cliente por nombre");
  return response.json();
};

export const getClienteById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Error al obtener el cliente por ID");
  return response.json();
};
