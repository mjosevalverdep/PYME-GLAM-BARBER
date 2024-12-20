const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/pagos`;

export const getPagos = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener los pagos");
  return response.json();
};

export const createPago = async (pago: {
  clienteID: string;
  monto: number;
  metodo: string;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pago),
  });
  if (!response.ok) throw new Error("Error al crear el pago");
  return response.json();
};
