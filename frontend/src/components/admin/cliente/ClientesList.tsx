"use client";

import React, { useEffect, useState } from "react";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  searchClienteByNombre,
} from "@/services/clienteApi";
import { FaEdit, FaTrash } from "react-icons/fa";

const ClientesList = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newCliente, setNewCliente] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    rol: "",
    password: "",
  });
  const [editingCliente, setEditingCliente] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setError("No se pudo obtener los clientes");
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          const data = await searchClienteByNombre(searchQuery);
          setClientes(data);
        } catch (err) {
          setError("No se pudo realizar la búsqueda");
        }
      } else {
        const data = await getClientes();
        setClientes(data);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCliente({
      ...newCliente,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        const updatedCliente = await updateCliente(
          editingCliente._id,
          newCliente,
        );
        setClientes(
          clientes.map((cliente) =>
            cliente._id === updatedCliente._id ? updatedCliente : cliente,
          ),
        );
      } else {
        const cliente = await createCliente(newCliente);
        setClientes([...clientes, cliente]);
      }
      setShowModal(false);
      setEditingCliente(null);
      setNewCliente({
        nombre: "",
        correo: "",
        telefono: "",
        rol: "",
        password: "",
      });
    } catch (err) {
      setError("No se pudo guardar el cliente");
    }
  };

  const handleEdit = (cliente: any) => {
    setEditingCliente(cliente);
    setNewCliente({
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      rol: cliente.rol,
      password: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCliente(id);
      setClientes(clientes.filter((cliente) => cliente._id !== id));
    } catch (err) {
      setError("No se pudo eliminar el cliente");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Clientes</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => {
            setShowModal(true);
            setEditingCliente(null);
          }}
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
        >
          Agregar Cliente
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nombre..."
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <div
            key={cliente._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              {cliente.nombre}
            </h2>
            <p className="text-gray-700">
              <strong>Correo:</strong> {cliente.correo}
            </p>
            <p className="text-gray-700">
              <strong>Teléfono:</strong> {cliente.telefono}
            </p>
            <p className="text-gray-700">
              <strong>Rol:</strong> {cliente.rol}
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={() => handleEdit(cliente)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaEdit className="inline-block" />
              </button>
              <button
                onClick={() => handleDelete(cliente._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash className="inline-block" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              {editingCliente ? "Editar Cliente" : "Agregar Cliente"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newCliente.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="correo" className="block text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  name="correo"
                  id="correo"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newCliente.correo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="block text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  id="telefono"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newCliente.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rol" className="block text-gray-700">
                  Rol
                </label>
                <input
                  type="text"
                  name="rol"
                  id="rol"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newCliente.rol}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newCliente.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
                >
                  {editingCliente ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesList;
