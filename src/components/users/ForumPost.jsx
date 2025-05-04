// components/forum/ForumPost.jsx
const ForumPost = ({ author, content, date }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <div className="text-sm text-gray-400">Publicado por {author} el {date}</div>
        <p className="text-white mt-2 whitespace-pre-line">{content}</p>
      </div>
    );
  };
  
  export default ForumPost;
