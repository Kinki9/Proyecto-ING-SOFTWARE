import React, { useState, useEffect } from "react";

const PostSection = ({ onNewPost }) => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("forumPosts");
    return saved ? JSON.parse(saved) : [];
  });

  const [newPost, setNewPost] = useState({
    author: "",
    group: "",
    title: "",
    content: "",
    priority: "normal" // nuevo campo para prioridad
  });

  const [expandedPostId, setExpandedPostId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("Todas");

  // Obtener grupos existentes para el selector
  const [availableGroups, setAvailableGroups] = useState([]);

  useEffect(() => {
    const groups = JSON.parse(localStorage.getItem("forumGroups") || "[]");
    setAvailableGroups(groups.map(g => g.name));
  }, []);

  useEffect(() => {
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }, [posts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.author.trim() || !newPost.title.trim() || !newPost.content.trim()) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const postToAdd = {
      id: Date.now(),
      author: newPost.author.trim(),
      group: newPost.group || "General",
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      priority: newPost.priority,
      timestamp: new Date().toISOString(),
      comments: 0
    };

    setPosts((prev) => [postToAdd, ...prev]);
    setNewPost({
      author: "",
      group: "",
      title: "",
      content: "",
      priority: "normal"
    });
    setExpandedPostId(postToAdd.id);
    onNewPost(); // Notificar a ForumPage del nuevo post
  };

  const toggleExpand = (id) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const filteredPosts = selectedGroup === "Todas" 
    ? posts 
    : posts.filter(post => post.group === selectedGroup);

  const priorityColors = {
    alta: "bg-red-50 border-red-200",
    media: "bg-yellow-50 border-yellow-200",
    normal: "bg-white border-gray-200"
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-500">Publicaciones</h2>
          <p className="text-gray-500">Anuncios, consultas y discusiones técnicas</p>
        </div>
        
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
        >
          <option value="Todas">Todos los grupos</option>
          {availableGroups.map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>

      {/* Formulario creación de publicación */}
      <form
        onSubmit={handleAddPost}
        className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-slate-500"
        aria-label="Agregar nueva publicación"
      >
        <h3 className="text-lg font-medium text-gray-800 mb-3">Nueva Publicación</h3>
        
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            name="author"
            placeholder="Tu nombre y cargo"
            value={newPost.author}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded px-3 py-2 mb-3 md:mb-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            required
            aria-label="Nombre del autor"
          />
          
          <select
            name="group"
            value={newPost.group}
            onChange={handleChange}
            className="w-48 border border-gray-300 rounded px-3 py-2 mb-3 md:mb-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            aria-label="Grupo de la publicación"
          >
            <option value="">Selecciona un grupo (opcional)</option>
            {availableGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="title"
          placeholder="Título de la publicación (ej: 'Problema con sistema de navegación')"
          value={newPost.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          required
          aria-label="Título de la publicación"
        />

        <div className="mt-3 flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-800">Prioridad:</label>
          <select
            name="priority"
            value={newPost.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          >
            <option value="normal">Normal</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <textarea
          name="content"
          placeholder="Describe tu publicación con detalle. Incluye datos técnicos si es necesario..."
          value={newPost.content}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          required
          aria-label="Contenido de la publicación"
        />

        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Publicar en el foro
        </button>
      </form>

      {/* Lista de publicaciones */}
      <div className="space-y-6 max-h-[500px] overflow-auto">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600 p-4 bg-gray-50 rounded-lg text-center">
            {selectedGroup === "Todas" 
              ? "No hay publicaciones aún." 
              : `No hay publicaciones en el grupo ${selectedGroup}.`}
          </p>
        ) : (
          filteredPosts.map(({ id, author, group, title, content, priority, timestamp }) => {
            const isExpanded = expandedPostId === id;
            return (
              <article
                key={id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${priorityColors[priority]} ${isExpanded ? 'shadow-md' : 'shadow-sm'}`}
                aria-expanded={isExpanded}
                aria-label={`Publicación: ${title} por ${author}`}
                tabIndex={0}
                onClick={() => toggleExpand(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand(id);
                  }
                }}
              >
                <header className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-indigo-700">{title}</h3>
                    <p className="text-sm text-gray-600">{author}</p>
                  </div>
                  <div className="text-right">
                    {group && (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full mb-1">
                        {group}
                      </span>
                    )}
                    <time
                      className="text-xs text-gray-400 block"
                      dateTime={timestamp}
                      title={new Date(timestamp).toLocaleString()}
                    >
                      {new Date(timestamp).toLocaleString()}
                    </time>
                  </div>
                </header>
                
                <p className="text-gray-700 whitespace-pre-line">
                  {isExpanded ? content : truncateText(content)}
                </p>
                
                <div className="flex justify-between items-center mt-3">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    Comentar ({Math.floor(Math.random() * 10)})
                  </button>
                  <p className="text-sm font-medium">
                    {isExpanded ? "Mostrar menos ▲" : "Mostrar más ▼"}
                  </p>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};

export default PostSection;