const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/promociones`;

export const getPromociones = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener las promociones");
  return response.json();
};

export const createPromocion = async (promocion: {
  nombre: string;
  descripcion: string;
  validoDesde: string;
  validoHasta: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(promocion),
  });
  if (!response.ok) throw new Error("Error al crear la promoción");
  return response.json();
};
