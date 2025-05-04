import { useState, useEffect } from "react";
import { MessageCircle, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CommentsSection from "../components/forum/CommentsSection";
import PostSection from "../components/forum/PostSection";
import GroupsSection from "../components/forum/GroupsSection";

const ForumPage = () => {
  const [forumStats, setForumStats] = useState({
    totalComments: 0,
    totalPosts: 0,
    totalGroups: 0
  });

  useEffect(() => {
    const comments = JSON.parse(localStorage.getItem("forumComments") || "[]");
    const posts = JSON.parse(localStorage.getItem("forumPosts") || "[]");
    const groups = JSON.parse(localStorage.getItem("forumGroups") || "[]");
    
    setForumStats({
      totalComments: comments.length,
      totalPosts: posts.length,
      totalGroups: groups.length
    });
  }, []);

  const handleNewComment = () => {
    setForumStats(prev => ({
      ...prev,
      totalComments: prev.totalComments + 1
    }));
  };

  const handleNewPost = () => {
    setForumStats(prev => ({
      ...prev,
      totalPosts: prev.totalPosts + 1
    }));
  };

  const handleNewGroup = () => {
    setForumStats(prev => ({
      ...prev,
      totalGroups: prev.totalGroups + 1
    }));
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Comunicación Aeroespacial" subtitle="Foro interno para colaboración entre áreas" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-10">
        {/* Estadísticas principales */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Comentarios"
            icon={MessageCircle}
            value={forumStats.totalComments.toLocaleString()}
            color="#6366F1"
            description="Interacciones en discusiones"
          />
          <StatCard
            name="Publicaciones"
            icon={FileText}
            value={forumStats.totalPosts.toLocaleString()}
            color="#10B981"
            description="Temas y anuncios publicados"
          />
          <StatCard
            name="Grupos de Trabajo"
            icon={Users}
            value={forumStats.totalGroups.toLocaleString()}
            color="#F59E0B"
            description="Equipos por área especializada"
          />
        </motion.div>

        {/* Secciones del foro */}
        <PostSection onNewPost={handleNewPost} />
        <CommentsSection onNewComment={handleNewComment} />
        <GroupsSection onNewGroup={handleNewGroup} />
      </main>
    </div>
  );
};

export default ForumPage;