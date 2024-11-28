const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/historial`;

export const getHistorial = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener el historial");
  return response.json();
};

export const createHistorial = async (registro: {
  clienteID: string;
  servicio: string;
  fecha: string;
  empleadoID: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registro),
  });
  if (!response.ok) throw new Error("Error al crear el historial");
  return response.json();
};
