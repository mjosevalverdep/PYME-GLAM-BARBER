"use client";

import React, { useEffect, useState } from "react";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import {
  getNotifications,
  createNotification,
} from "@/services/notificacionApi";
import { getClientes } from "@/services/clienteApi";

interface Notification {
  _id: string;
  mensaje: string;
  tipo: string;
  fechaEnvio: string;
}

interface Cliente {
  _id: string;
  nombre: string;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newNotification, setNewNotification] = useState({
    clienteID: "",
    mensaje: "",
    tipo: "",
    fechaEnvio: "",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        setError("No se pudo obtener las notificaciones");
      }
    };

    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setError("No se pudo obtener los clientes");
      }
    };

    fetchNotifications();
    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          const filteredNotifications = notifications.filter((notification) =>
            notification.mensaje
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          );
          setNotifications(filteredNotifications);
        } catch (err) {
          setError("No se pudo realizar la búsqueda");
        }
      } else {
        const data = await getNotifications();
        setNotifications(data);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewNotification({
      ...newNotification,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const notification = await createNotification(newNotification);
      setNotifications([...notifications, notification]);
      setShowModal(false);
      setNewNotification({
        clienteID: "",
        mensaje: "",
        tipo: "",
        fechaEnvio: "",
      });
    } catch (err) {
      setError("No se pudo guardar la notificación");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Notificaciones</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
        >
          Agregar Notificación
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              {notification.mensaje}
            </h2>
            <p className="text-gray-700">
              <strong>Tipo:</strong> {notification.tipo}
            </p>
            <p className="text-gray-700">
              <strong>Fecha de envío:</strong> {notification.fechaEnvio}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              Agregar Notificación
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="clienteID" className="block text-gray-700">
                  Seleccionar Cliente
                </label>
                <select
                  id="clienteID"
                  name="clienteID"
                  value={newNotification.clienteID}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
                  required
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente._id} value={cliente._id}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="mensaje" className="block text-gray-700">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  id="mensaje"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newNotification.mensaje}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tipo" className="block text-gray-700">
                  Tipo
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newNotification.tipo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="recordatorio">Recordatorio</option>
                  <option value="alerta">Alerta</option>
                  <option value="información">Información</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="fechaEnvio" className="block text-gray-700">
                  Fecha de Envío
                </label>
                <input
                  type="date"
                  name="fechaEnvio"
                  id="fechaEnvio"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newNotification.fechaEnvio}
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
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
