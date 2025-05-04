// components/forum/ForumCreatePost.jsx
import { useState } from "react";

const ForumCreatePost = ({ onPost }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() !== "") {
      onPost(value);
      setValue("");
    }
  };
        

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <textarea
        className="w-full h-24 bg-gray-700 text-white rounded-lg p-2 border border-gray-600"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe una nueva publicación..."
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
      >
        Publicar
      </button>
    </div>
  );

  
};

export default ForumCreatePost;
