import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      <div key={comment.id} className={`mb-4 ${parentId ? "ml-6 border-l-2 border-gray-600 pl-4" : ""}`}>
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-gray-600 rounded-lg shadow-sm"
        >
          <header className="flex justify-between mb-1">
            <h4 className="text-sm font-semibold text-indigo-300">{comment.author}</h4>
            <time className="text-xs text-gray-400">
              {new Date(comment.timestamp).toLocaleString()}
            </time>
          </header>
          <p className="text-sm text-gray-200 whitespace-pre-line">{comment.text}</p>
          <div className="flex justify-end mt-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setReplyingTo(comment.id);
                setShowCommentForm(false);
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Responder
            </motion.button>
          </div>
        </motion.article>

        {replyingTo === comment.id && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={(e) => handleAddComment(e, comment.id)} 
            className="mt-2 space-y-2"
          >
            <input
              type="text"
              name="author"
              placeholder="Tu nombre"
              value={newComment.author}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
            <textarea
              name="text"
              placeholder="Tu respuesta..."
              value={newComment.text}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              rows={2}
              required
            />
            <div className="flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setReplyingTo(null);
                  setShowCommentForm(true);
                }}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Responder
              </motion.button>
            </div>
          </motion.form>
        )}

        {renderComments(comment.id)}
      </div>
    ));
  };

  return (
    <section className="mt-4 space-y-6">
      {showCommentForm && (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={(e) => handleAddComment(e)} 
          className="space-y-2"
        >
          <input
            type="text"
            name="author"
            placeholder="Tu nombre"
            value={newComment.author}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="text"
            placeholder="Escribe un comentario..."
            value={newComment.text}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Comentar
          </motion.button>
        </motion.form>
      )}

      <div className="space-y-4">{renderComments()}</div>
    </section>
  );
};

export default CommentsSection;