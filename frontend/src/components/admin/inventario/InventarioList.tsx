"use client";

import React, { useEffect, useState } from 'react';
import { getInventario, createInventario, updateInventario, deleteInventario } from '@/services/inventarioApi';
import { FaEdit, FaTrash } from 'react-icons/fa';

const InventarioList = () => {
  const [inventarios, setInventarios] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newInventario, setNewInventario] = useState({
    producto: '', 
    cantidad: 0,
    precioUnidad: 0, 
    proveedor: '',
  });
  
  const [editingInventario, setEditingInventario] = useState<any | null>(null);

  useEffect(() => {
    const fetchInventarios = async () => {
      try {
        const data = await getInventario();
        setInventarios(data);
      } catch (err) {
        setError('No se pudo obtener los inventarios');
      }
    };

    fetchInventarios();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInventario({
      ...newInventario,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const inventarioData = {
        producto: newInventario.producto,
        cantidad: newInventario.cantidad,
        precioUnidad: newInventario.precioUnidad,
        proveedor: newInventario.proveedor,
      };

      if (editingInventario) {
        const updatedInventario = await updateInventario(editingInventario._id, inventarioData);
        setInventarios(inventarios.map(inventario => (inventario._id === updatedInventario._id ? updatedInventario : inventario)));
      } else {
        const inventario = await createInventario(inventarioData);
        setInventarios([...inventarios, inventario]);
      }
      setShowModal(false);
      setEditingInventario(null);
      setNewInventario({
        producto: '',
        cantidad: 0,
        precioUnidad: 0,
        proveedor: '',
      });
    } catch (err) {
      setError('No se pudo guardar el inventario');
    }
  };

  const handleEdit = (inventario: any) => {
    setEditingInventario(inventario);
    setNewInventario({
      producto: inventario.producto,
      cantidad: inventario.cantidad,
      precioUnidad: inventario.precioUnidad,
      proveedor: inventario.proveedor,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInventario(id);
      setInventarios(inventarios.filter(inventario => inventario._id !== id));
    } catch (err) {
      setError('No se pudo eliminar el inventario');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Inventarios</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => {
            setShowModal(true);
            setEditingInventario(null);
          }}
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
        >
          Agregar Inventario
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventarios.map(inventario => (
          <div key={inventario._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-medium text-gray-800 mb-2">{inventario.producto}</h2>
            <p className="text-gray-700"><strong>Proveedor:</strong> {inventario.proveedor}</p>
            <p className="text-gray-700"><strong>Cantidad:</strong> {inventario.cantidad}</p>
            <p className="text-gray-700"><strong>Precio por unidad:</strong> {inventario.precioUnidad}</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={() => handleEdit(inventario)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaEdit className="inline-block" />
              </button>
              <button
                onClick={() => handleDelete(inventario._id)}
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
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">{editingInventario ? 'Editar Inventario' : 'Agregar Inventario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="producto" className="block text-gray-700">Producto</label>
                <input
                  type="text"
                  name="producto"
                  id="producto"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newInventario.producto}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="proveedor" className="block text-gray-700">Proveedor</label>
                <input
                  type="text"
                  name="proveedor"
                  id="proveedor"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newInventario.proveedor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cantidad" className="block text-gray-700">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newInventario.cantidad}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="precioUnidad" className="block text-gray-700">Precio por unidad</label>
                <input
                  type="number"
                  name="precioUnidad"
                  id="precioUnidad"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newInventario.precioUnidad}
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
                  {editingInventario ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventarioList;