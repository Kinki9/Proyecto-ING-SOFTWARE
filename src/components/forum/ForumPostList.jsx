// components/forum/ForumPostList.jsx
import ForumPost from "components/forum/ForumPost";

const ForumPostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <div className="text-gray-400">No hay publicaciones aún.</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post, idx) => (
        <ForumPost
          key={idx}
          author={post.author}
          content={post.content}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default ForumPostList;
