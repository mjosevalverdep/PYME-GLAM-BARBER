const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/encuestas`;

export const getEncuestas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener las encuestas");
  return response.json();
};

export const createEncuesta = async (encuesta: { preguntas: string[] }) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(encuesta),
  });
  if (!response.ok) throw new Error("Error al crear la encuesta");
  return response.json();
};
