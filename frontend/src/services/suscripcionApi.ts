const API_URL = "http://localhost:9000/api/suscripciones";

export const getSuscripciones = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener las suscripciones");
  return response.json();
};

export const createSuscripcion = async (suscripcion: {
  clienteID: string;
  tipo: string;
  costo: number;
  fechaInicio: string;
  fechaFin: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(suscripcion),
  });
  if (!response.ok) throw new Error("Error al crear la suscripción");
  return response.json();
};
