const API_URL = "http://localhost:9000/api/inventario";

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
  if (!response.ok) throw new Error("Error al agregar el producto al inventario");
  return response.json();
};
