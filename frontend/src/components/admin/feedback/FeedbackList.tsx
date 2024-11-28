"use client";

import React, { useEffect, useState } from "react";
import { getFeedback } from "@/services/feedbackApi";

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const fetchFeedbacks = async () => {
    try {
      const feedbackData = await getFeedback();
      setFeedbacks(feedbackData);
    } catch (error) {
      setError("No se pudo obtener el feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Lista de Feedback</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <p className="text-gray-700"><strong>Servicio:</strong> {feedback.servicio}</p>
            <p className="text-gray-700"><strong>Calificación:</strong> {feedback.calificacion}</p>
            <p className="text-gray-700"><strong>Comentario:</strong> {feedback.comentario}</p>
            <p className="text-gray-700"><strong>Fecha:</strong> {new Date(feedback.fecha).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
