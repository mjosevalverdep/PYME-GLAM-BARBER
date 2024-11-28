const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;

export const getFeedback = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener el feedback");
  return response.json();
};

export const createFeedback = async (feedback: {
  clienteID: string;
  empleadoID: string;
  servicio: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedback),
  });
  if (!response.ok) throw new Error("Error al crear el feedback");
  return response.json();
};
