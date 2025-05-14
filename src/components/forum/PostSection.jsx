import React, { useState, useEffect } from "react";
import CommentsSection from "./CommentsSection";

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
      <h2 className="text-xl font-semibold mb-4">Publicaciones del Grupo</h2>

      <form onSubmit={handleSubmit} className="text-black mb-6 space-y-4">
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleChange}
          placeholder="Contenido"
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Publicar
        </button>
      </form>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-600">No hay publicaciones aún en este grupo.</p>
      ) : (
        filteredPosts.map((post) => (
          <article key={post.id} className="mb-6 p-4 border rounded shadow">
            <header className="flex justify-between mb-2">
              <h3 className="font-semibold text-indigo-700">{post.title}</h3>
              <time className="text-xs text-gray-500">
                {new Date(post.timestamp).toLocaleString()}
              </time>
            </header>

            <p className="mb-3">{post.content}</p>

            <button
              onClick={() =>
                setActiveCommentPostId((prev) => (prev === post.id ? null : post.id))
              }
              className="text-sm text-indigo-600 hover:underline mb-3"
            >
              {activeCommentPostId === post.id ? "Ocultar comentarios" : "Comentar"}
            </button>

            {activeCommentPostId === post.id && (
              <CommentsSection
                postId={post.id}
                postTitle={post.title}
                onNewComment={() => {}}
                embedded={true}
              />
            )}
          </article>
        ))
      )}
    </section>
  );
};

export default PostSection;