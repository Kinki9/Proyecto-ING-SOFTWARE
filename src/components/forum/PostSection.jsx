import React, { useState, useEffect } from "react";
import CommentsSection from "./CommentsSection";
import { motion } from "framer-motion";

const PostSection = ({ groupId, onNewPost }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", groupId });
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("forumPosts") || "[]");
    setPosts(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const postToAdd = {
      id: Date.now().toString(),
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      groupId,
      timestamp: new Date().toISOString(),
    };

    const updated = [postToAdd, ...posts];
    localStorage.setItem("forumPosts", JSON.stringify(updated));
    setPosts(updated);
    setNewPost({ title: "", content: "", groupId });
    onNewPost?.();
  };

  const filteredPosts = posts.filter((p) => p.groupId === groupId);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white">Publicaciones del Grupo</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleChange}
          placeholder="Contenido"
          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
        >
          Publicar
        </motion.button>
      </form>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-400">No hay publicaciones aún en este grupo.</p>
      ) : (
        filteredPosts.map((post) => (
          <motion.article 
            key={post.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-gray-700 rounded-lg shadow"
          >
            <header className="flex justify-between mb-2">
              <h3 className="font-semibold text-indigo-400">{post.title}</h3>
              <time className="text-xs text-gray-400">
                {new Date(post.timestamp).toLocaleString()}
              </time>
            </header>

            <p className="mb-3 text-gray-300">{post.content}</p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setActiveCommentPostId((prev) => (prev === post.id ? null : post.id))
              }
              className="text-sm text-indigo-400 hover:text-indigo-300 mb-3"
            >
              {activeCommentPostId === post.id ? "Ocultar comentarios" : "Comentar"}
            </motion.button>

            {activeCommentPostId === post.id && (
              <CommentsSection
                postId={post.id}
                postTitle={post.title}
                onNewComment={() => {}}
                embedded={true}
              />
            )}
          </motion.article>
        ))
      )}
    </section>
  );
};

export default PostSection;