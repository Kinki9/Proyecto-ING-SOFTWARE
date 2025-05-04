// components/forum/ForumComment.jsx

const ForumComment = ({ author, text }) => {
    return (
      <div className="bg-gray-700 px-4 py-2 rounded-lg text-white mt-2 border border-gray-600">
        <span className="text-sm font-semibold">{author}: </span>
        <span className="text-sm">{text}</span>
      </div>
    );
  };
  
  export default ForumComment;