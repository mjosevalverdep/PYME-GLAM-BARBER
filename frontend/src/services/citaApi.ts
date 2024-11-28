const API_URL = `http://localhost:9000/api/citas`;

export const getCitas = async () => {
  const response = await fetch(`${API_URL}/citas`);
  if (!response.ok) throw new Error("Error al obtener las citas");
  return response.json();
};

export const createCita = async (cita: {
  clienteId: string;
  servicioId: string;
  fecha: string;
  estado?: string;
  notas?: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  if (!response.ok) throw new Error("Error al crear la cita");
  return response.json();
};

export const deleteCita = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/citas/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al eliminar la cita");
  }

  return response.json();
};
