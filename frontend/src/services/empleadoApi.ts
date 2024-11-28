const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/empleados`;

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
  rol: string;
  password: string;
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
  empleado: { nombre: string; puesto: string; correo: string; telefono: string; rol: string }
) => {
  const response = await fetch(`${API_URL}/editar/${id}`, {
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

export const searchEmpleadoByNombre = async (nombre: string) => {
  const response = await fetch(`${API_URL}/nombre/${nombre}`);
  if (!response.ok) throw new Error("Error al buscar empleado por nombre");
  return response.json();
};
