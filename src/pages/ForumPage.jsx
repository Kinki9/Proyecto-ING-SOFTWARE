// pages/ForumPage.jsx
import { useState } from "react";
import ForumGroupSelector from "/components/forum/ForumGroupSelector";
import ForumCreatePost from "../components/forum/ForumCreatePost";
import ForumPostList from "../components/forum/ForumPostList";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Todos");

  const handleNewPost = (content) => {
    const newPost = {
      author: "Trabajador", // Reemplazar por nombre de usuario si lo integras con autenticación
      content,
      date: new Date().toLocaleString(),
      group: selectedGroup
    };
    setPosts([newPost, ...posts]);
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  const filteredPosts =
    selectedGroup === "Todos"
      ? posts
      : posts.filter((post) => post.group === selectedGroup);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8 px-4">
      <ForumGroupSelector onSelect={handleGroupChange} />
      <ForumCreatePost onPost={handleNewPost} />
      <ForumPostList posts={filteredPosts} />
    </div>
  );
};

export default ForumPage;
