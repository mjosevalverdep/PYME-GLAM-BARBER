"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCitas,
  createCita,
  deleteCita,
} from "@/services/citaApi";
import CitaCard from "@/components/citas/CitaCard";
import AddButton from "@/components/citas/AddButton";
import CitaModal from "@/components/citas/CitaModal";

interface Cita {
  id: string;
  clienteId: string;
  servicioId: string;
  cliente: string;
  servicio: string;
  fecha: string;
  estado: string;
  notas?: string;
}

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const data = await getCitas();
      const formattedData = data.map((cita: any) => ({
        id: cita._id,
        clienteId: cita.clienteId?._id || "",
        servicioId: cita.servicioId?._id || "",
        cliente: cita.clienteId?.nombre || "Desconocido",
        servicio: cita.servicioId?.nombre || "Desconocido",
        fecha: cita.fecha,
        estado: cita.estado,
        notas: cita.notas,
      }));
      setCitas(formattedData);
    } catch (error) {
      toast.error("Error al obtener las citas.");
    }
  };

  const handleCreateCita = async (cita: {
    clienteId: string;
    servicioId: string;
    fecha: string;
    estado?: string;
    notas?: string;
  }) => {
    try {
      await createCita(cita);
      setShowModal(false);
      fetchCitas();
      toast.success("Cita creada correctamente.");
    } catch (error) {
      toast.error("Error al crear la cita.");
    }
  };

  const handleDeleteCita = async (id: string) => {
    try {
      await deleteCita(id);
      fetchCitas();
      toast.success("Cita eliminada correctamente.");
    } catch (error) {
      toast.error("Error al eliminar la cita.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Gestión de Citas
        </h1>

        <div className="flex justify-center mb-6">
          <AddButton onClick={() => setShowModal(true)} isOpen={showModal} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {citas.map((cita) => (
            <CitaCard
              key={cita.id}
              cita={cita}
              onEdit={() => setEditingCita(cita)}
              onDelete={() => handleDeleteCita(cita.id)}
            />
          ))}
        </div>

        {showModal && (
          <CitaModal
            cita={null}
            onClose={() => setShowModal(false)}
            onSave={(newCita) => {
              handleCreateCita(newCita);
            }}
          />
        )}

        {editingCita && (
          <CitaModal
            cita={{
              clienteId: editingCita.clienteId,
              servicioId: editingCita.servicioId,
              fecha: editingCita.fecha,
              estado: editingCita.estado,
              notas: editingCita.notas,
            }}
            onClose={() => setEditingCita(null)}
            onSave={(updatedCita) => {
              fetchCitas();
              setEditingCita(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
