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
    <div className="flex-1 overflow-auto relative z-10 bg-gray-800">
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
            <motion.button
              onClick={() => setActiveGroupId(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Volver a grupos
            </motion.button>

            <PostSection groupId={activeGroupId} onNewPost={handleNewPost} />
          </>
        )}
      </main>
    </div>
  );
};

export default ForumPage;