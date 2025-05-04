import React, { useState, useEffect } from "react";

const CommentsSection = ({ onNewComment }) => {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("forumComments");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newComment, setNewComment] = useState({
    author: "",
    postId: "",
    text: "",
  });

  const [filterPost, setFilterPost] = useState("Todas");
  const [availablePosts, setAvailablePosts] = useState([]);

  // Cargar posts disponibles para asociar comentarios
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("forumPosts") || "[]");
    setAvailablePosts(posts.map(post => ({ id: post.id, title: post.title })));
  }, []);

  useEffect(() => {
    localStorage.setItem("forumComments", JSON.stringify(comments));
  }, [comments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.text.trim()) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const commentToAdd = {
      id: Date.now(),
      author: newComment.author.trim(),
      postId: newComment.postId || null,
      postTitle: availablePosts.find(p => p.id === newComment.postId)?.title || "General",
      text: newComment.text.trim(),
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => [commentToAdd, ...prev]);
    setNewComment({
      author: "",
      postId: "",
      text: "",
    });
    
    onNewComment(); // Notificar a ForumPage del nuevo comentario
  };

  const filteredComments = filterPost === "Todas" 
    ? comments 
    : comments.filter(c => c.postId === filterPost);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Discusiones</h2>
      <p className="text-gray-600 mb-4">Participa en conversaciones técnicas y colaborativas</p>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <div className="mb-2 md:mb-0">
          <label htmlFor="filterPost" className="mr-2 font-medium text-gray-700">
            Filtrar por publicación:
          </label>
          <select
            id="filterPost"
            value={filterPost}
            onChange={(e) => setFilterPost(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="Todas">Todas las discusiones</option>
            {availablePosts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title.length > 30 ? post.title.slice(0, 30) + "..." : post.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Formulario de nuevo comentario */}
      <form
        onSubmit={handleAddComment}
        className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-slate-700"
        aria-label="Agregar nuevo comentario"
      >
        <h3 className="text-lg font-medium text-gray-800 mb-3">Nuevo Comentario</h3>
        
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            name="author"
            placeholder="Tu nombre y cargo"
            value={newComment.author}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded px-3 py-2 mb-3 md:mb-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Nombre del autor"
            required
          />
          
          <select
            name="postId"
            value={newComment.postId}
            onChange={handleChange}
            className="w-48 border border-gray-300 rounded px-3 py-2 mb-3 md:mb-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Publicación relacionada"
          >
            <option value="">Publicación general (opcional)</option>
            {availablePosts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title.length > 25 ? post.title.slice(0, 25) + "..." : post.title}
              </option>
            ))}
          </select>
        </div>
        
        <textarea
          name="text"
          placeholder="Escribe tu comentario técnico, sugerencia o respuesta..."
          value={newComment.text}
          onChange={handleChange}
          rows={3}
          className="w-full mt-3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Texto del comentario"
          required
        />
        
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Publicar comentario
        </button>
      </form>

      {/* Lista de comentarios */}
      <div className="space-y-4 max-h-96 overflow-auto">
        {filteredComments.length === 0 ? (
          <p className="text-gray-600 p-4 bg-gray-50 rounded-lg text-center">
            {filterPost === "Todas" 
              ? "No hay comentarios aún." 
              : "No hay comentarios en esta publicación."}
          </p>
        ) : (
          filteredComments.map(({ id, author, postTitle, text, timestamp }) => (
            <article
              key={id}
              className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              aria-label={`Comentario de ${author}`}
            >
              <header className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-indigo-700">{author}</h3>
                  {postTitle && (
                    <p className="text-xs text-gray-500">
                      En: <span className="font-medium">{postTitle}</span>
                    </p>
                  )}
                </div>
                <time
                  className="text-xs text-gray-400"
                  dateTime={timestamp}
                  title={new Date(timestamp).toLocaleString()}
                >
                  {new Date(timestamp).toLocaleString()}
                </time>
              </header>
              
              <p className="text-gray-700 whitespace-pre-line">{text}</p>
              
              <div className="flex justify-end mt-2 space-x-2">
                <button className="text-xs text-indigo-600 hover:text-indigo-800">
                  Responder
                </button>
                <button className="text-xs text-indigo-600 hover:text-indigo-800">
                  Reportar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentsSection;