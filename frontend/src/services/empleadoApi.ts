const API_URL = "http://localhost:9000/api/empleados";

export const getEmpleados = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error al obtener los empleados");
  return response.json();
};

export const createEmpleado = async (empleado: {
  nombre: string;
  puesto: string;
  correo: string;
  telefono: string;
}) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(empleado),
  });
  if (!response.ok) throw new Error("Error al crear el empleado");
  return response.json();
};

export const updateEmpleado = async (
  id: string,
  empleado: { nombre: string; puesto: string; correo: string; telefono: string }
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(empleado),
  });
  if (!response.ok) throw new Error("Error al actualizar el empleado");
  return response.json();
};

export const deleteEmpleado = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el empleado");
  return response.json();
};

export const searchEmpleadoByCorreo = async (correo: string) => {
  const response = await fetch(`${API_URL}/correo/${correo}`);
  if (!response.ok) throw new Error("Error al buscar empleado por correo");
  return response.json();
};

export const searchEmpleadoByTelefono = async (telefono: string) => {
  const response = await fetch(`${API_URL}/telefono/${telefono}`);
  if (!response.ok) throw new Error("Error al buscar empleado por teléfono");
  return response.json();
};

export const searchEmpleadoByPuesto = async (puesto: string) => {
  const response = await fetch(`${API_URL}/puesto/${puesto}`);
  if (!response.ok) throw new Error("Error al buscar empleado por puesto");
  return response.json();
};

export const searchEmpleadoByNombre = async (nombre: string) => {
  const response = await fetch(`${API_URL}/nombre/${nombre}`);
  if (!response.ok) throw new Error("Error al buscar empleado por nombre");
  return response.json();
};

export const getTotalEmpleados = async () => {
  const response = await fetch(`${API_URL}/total`);
  if (!response.ok) throw new Error("Error al obtener el total de empleados");
  return response.json();
};
