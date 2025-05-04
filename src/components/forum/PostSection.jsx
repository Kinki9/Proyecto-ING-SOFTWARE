import React, { useState } from "react";
import { FileText, PlusCircle } from "lucide-react";

const PostsSection = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Actualización del protocolo de seguridad",
      author: "Carlos Méndez",
      content:
        "Se ha implementado un nuevo protocolo para mejorar la seguridad en las operaciones aeroespaciales. Por favor, revisen el documento adjunto y sigan las indicaciones para evitar incidentes.",
      date: new Date("2024-06-03T09:00:00"),
    },
    {
      id: 2,
      title: "Solicitud de apoyo para calibración de sensores",
      author: "Lucía Fernández",
      content:
        "Necesitamos apoyo urgente para calibrar los sensores de navegación en el área de lanzamiento. Quienes puedan asistir, por favor contáctenme directamente.",
      date: new Date("2024-06-04T11:30:00"),
    },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [expandedPostId, setExpandedPostId] = useState(null);

  const handleAddPost = (e) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    const trimmedContent = newContent.trim();
    if (!trimmedTitle || !trimmedContent) return;

    const post = {
      id: Date.now(),
      title: trimmedTitle,
      author: "Usuario Actual", // Cambiar según sea necesario
      content: trimmedContent,
      date: new Date(),
    };

    setPosts([post, ...posts]);
    setNewTitle("");
    setNewContent("");
    setExpandedPostId(post.id); // expandir el post recién creado
  };

  const toggleExpand = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  const formatDate = (date) =>
    date.toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Publicaciones</h2>

      <form onSubmit={handleAddPost} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Título de la publicación"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          maxLength={100}
        />
        <textarea
          rows="4"
          placeholder="Contenido de la publicación"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          required
          maxLength={1000}
        />
        <button
          type="submit"
          disabled={!newTitle.trim() || !newContent.trim()}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-md transition"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Publicar
        </button>
      </form>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[480px] overflow-y-auto">
        {posts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center">No hay publicaciones aún.</p>
        )}
        {posts.map(({ id, title, author, content, date }) => {
          const isExpanded = expandedPostId === id;
          const preview = content.length > 150 ? content.slice(0, 150) + "..." : content;

          return (
            <article
              key={id}
              className="py-5 cursor-pointer"
              onClick={() => toggleExpand(id)}
              aria-expanded={isExpanded}
            >
              <header className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                <time
                  dateTime={date.toISOString()}
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  {formatDate(date)}
                </time>
              </header>
              <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">{isExpanded ? content : preview}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Por {author}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(id);
                }}
                className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold mt-1"
              >
                {isExpanded ? "Mostrar menos" : "Leer más"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PostsSection;