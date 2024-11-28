"use client";

import React, { useEffect, useState } from "react";
import { getPromociones, createPromocion } from "@/services/promocionApi";

const PromocionList = () => {
  const [promociones, setPromociones] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newPromocion, setNewPromocion] = useState({
    nombre: "",
    descripcion: "",
    validoDesde: "",
    validoHasta: "",
  });
  const [editingPromocion, setEditingPromocion] = useState<any | null>(null);

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        const data = await getPromociones();
        setPromociones(data);
      } catch (err) {
        setError("No se pudo obtener las promociones");
      }
    };

    fetchPromociones();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPromocion({
      ...newPromocion,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPromocion) {
        // Actualizar promoción lógica
      } else {
        const promocion = await createPromocion(newPromocion);
        setPromociones([...promociones, promocion]);
      }
      setShowModal(false);
      setEditingPromocion(null);
      setNewPromocion({
        nombre: "",
        descripcion: "",
        validoDesde: "",
        validoHasta: "",
      });
    } catch (err) {
      setError("No se pudo guardar la promoción");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Promociones</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => {
            setShowModal(true);
            setEditingPromocion(null);
          }}
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
        >
          Agregar Promoción
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promociones.map((promocion) => (
          <div
            key={promocion._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              {promocion.nombre}
            </h2>
            <p className="text-gray-700">
              <strong>Descripción:</strong> {promocion.descripcion}
            </p>
            <p className="text-gray-700">
              <strong>Válido desde:</strong> {promocion.validoDesde}
            </p>
            <p className="text-gray-700">
              <strong>Válido hasta:</strong> {promocion.validoHasta}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              {editingPromocion ? "Editar Promoción" : "Agregar Promoción"}
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
                  value={newPromocion.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="descripcion" className="block text-gray-700">
                  Descripción
                </label>
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newPromocion.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="validoDesde" className="block text-gray-700">
                  Válido Desde
                </label>
                <input
                  type="date"
                  name="validoDesde"
                  id="validoDesde"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newPromocion.validoDesde}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="validoHasta" className="block text-gray-700">
                  Válido Hasta
                </label>
                <input
                  type="date"
                  name="validoHasta"
                  id="validoHasta"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newPromocion.validoHasta}
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
                  {editingPromocion ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromocionList;
