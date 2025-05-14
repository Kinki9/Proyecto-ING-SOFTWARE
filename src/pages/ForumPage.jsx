import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import GroupsSection from "../components/forum/GroupsSection";
import PostSection from "../components/forum/PostSection";

const ForumPage = () => {
  const [groups, setGroups] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState(null);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("forumGroups") || "[]");
    setGroups(storedGroups);
  }, []);

  const handleNewGroup = () => {
    const updatedGroups = JSON.parse(localStorage.getItem("forumGroups") || "[]");
    setGroups(updatedGroups);
  };

  const handleEnterGroup = (groupId) => {
    setActiveGroupId(groupId);
  };

  const handleNewPost = () => {
    // Lógica adicional si quieres actualizar estadísticas, etc.
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header
        title="Comunicación Aeroespacial"
        subtitle={
          activeGroupId
            ? `Grupo: ${groups.find((g) => g.id === activeGroupId)?.name || ""}`
            : "Foro interno: selecciona o crea un grupo"
        }
      />

      <main className="max-w-4xl mx-auto py-6 px-4 space-y-6">
        {!activeGroupId ? (
          <GroupsSection
            onNewGroup={handleNewGroup}
            onEnterGroup={handleEnterGroup}
            showOnlyButtons={true}
          />
        ) : (
          <>
            <button
              onClick={() => setActiveGroupId(null)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition mb-4"
            >
              ← Volver a selección de grupos
            </button>

            <PostSection groupId={activeGroupId} onNewPost={handleNewPost} />
          </>
        )}
      </main>
    </div>
  );
};

export default ForumPage;