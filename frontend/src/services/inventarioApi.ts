const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/inventario`;

export const getInventario = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener el inventario");
  return response.json();
};

export const createInventario = async (producto: {
  producto: string;
  cantidad: number;
  precioUnidad: number;
  proveedor?: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!response.ok)
    throw new Error("Error al agregar el producto al inventario");
  return response.json();
};

export const updateInventario = async (
  id: string,
  producto: {
    producto: string;
    cantidad: number;
    precioUnidad: number;
    proveedor?: string;
  },
) => {
  const response = await fetch(`${API_URL}/editar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!response.ok) throw new Error("Error al actualizar el inventario");
  return response.json();
};

export const deleteInventario = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el inventario");
  return response.json();
};
