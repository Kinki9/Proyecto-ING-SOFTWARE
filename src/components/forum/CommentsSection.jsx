import React, { useState, useEffect } from "react";

const CommentsSection = ({
  onNewComment,
  postId,
  postTitle = "",
  embedded = false,
}) => {
  const storageKey = "forumComments";
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: "", text: "" });
  const [replyingTo, setReplyingTo] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(true);

  // Cargar comentarios al iniciar o cuando cambia el postId
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : [];
    setAllComments(parsed);
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = (e, parentId = null) => {
    e.preventDefault();

    if (!newComment.author.trim() || !newComment.text.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const commentToAdd = {
      id: Date.now(),
      author: newComment.author.trim(),
      text: newComment.text.trim(),
      postId,
      parentId,
      timestamp: new Date().toISOString(),
    };

    const saved = localStorage.getItem(storageKey);
    const existingComments = saved ? JSON.parse(saved) : [];

    const updated = [commentToAdd, ...existingComments];
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setAllComments(updated);

    setNewComment({ author: "", text: "" });
    setReplyingTo(null);
    setShowCommentForm(true);
    onNewComment?.();
  };

  const renderComments = (parentId = null) => {
    const filtered = allComments
      .filter((c) => c.postId === postId && c.parentId === parentId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return filtered.map((comment) => (
      <div key={comment.id} className={`mb-4 ${parentId ? "ml-6 border-l pl-4" : ""}`}>
        <article className="p-3 bg-white rounded border shadow-sm">
          <header className="flex justify-between mb-1">
            <h4 className="text-sm font-semibold text-indigo-700">{comment.author}</h4>
            <time className="text-xs text-gray-500">
              {new Date(comment.timestamp).toLocaleString()}
            </time>
          </header>
          <p className="text-sm text-gray-800 whitespace-pre-line">{comment.text}</p>
          <div className="flex justify-end mt-1">
            <button
              onClick={() => {
                setReplyingTo(comment.id);
                setShowCommentForm(false);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Responder
            </button>
          </div>
        </article>

        {replyingTo === comment.id && (
          <form onSubmit={(e) => handleAddComment(e, comment.id)} className="mt-2 space-y-2">
            <input
              type="text"
              name="author"
              placeholder="Tu nombre"
              value={newComment.author}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded text-black"
              required
            />
            <textarea
              name="text"
              placeholder="Tu respuesta..."
              value={newComment.text}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded text-black"
              rows={2}
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setReplyingTo(null);
                  setShowCommentForm(true);
                }}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 border border-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
              >
                Responder
              </button>
            </div>
          </form>
        )}

        {renderComments(comment.id)}
      </div>
    ));
  };

  return (
    <section className="mt-4 space-y-6">
      {showCommentForm && (
        <form onSubmit={(e) => handleAddComment(e)} className="space-y-2">
          <input
            type="text"
            name="author"
            placeholder="Tu nombre"
            value={newComment.author}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
          <textarea
            name="text"
            placeholder="Escribe un comentario..."
            value={newComment.text}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
            rows={3}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Comentar
          </button>
        </form>
      )}

      <div className="space-y-4">{renderComments()}</div>
    </section>
  );
};

export default CommentsSection;