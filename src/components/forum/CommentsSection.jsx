import React, { useState } from "react";
import { UserIcon, Send } from "lucide-react";

const CommentsSection = () => {
  // Estado local para los comentarios
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Juan Pérez",
      content: "¿Alguien tiene información sobre el último reporte de vuelo?",
      date: new Date("2024-06-01T10:15:00"),
    },
    {
      id: 2,
      author: "Ana Gómez",
      content: "La sección de mantenimiento está coordinando las revisiones programadas.",
      date: new Date("2024-06-02T14:30:00"),
    },
  ]);
  // Estado para control del input de nuevo comentario
  const [newComment, setNewComment] = useState("");

  // Manejar envío del nuevo comentario
  const handleAddComment = (e) => {
    e.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) return;

    const comment = {
      id: Date.now(),
      author: "Usuario Actual", // Aquí puede integrarse la info real de usuario
      content: trimmed,
      date: new Date(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  // Formatear fecha a formato legible
  const formatDate = (date) => {
    return date.toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Comentarios
      </h2>

      <form onSubmit={handleAddComment} className="mb-6">
        <label htmlFor="new-comment" className="sr-only">
          Escribe un nuevo comentario
        </label>
        <textarea
          id="new-comment"
          rows="3"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Escribe tu comentario aquí..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="mt-2 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-md transition"
        >
          <Send className="mr-2 h-4 w-4" />
          Publicar
        </button>
      </form>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {comments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center">No hay comentarios aún.</p>
        )}
        {comments.map(({ id, author, content, date }) => (
          <article key={id} className="py-4 flex space-x-4">
            <UserIcon className="h-8 w-8 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{author}</h3>
              <time
                dateTime={date.toISOString()}
                className="block text-xs text-gray-500 dark:text-gray-400 mb-1"
              >
                {formatDate(date)}
              </time>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{content}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;
