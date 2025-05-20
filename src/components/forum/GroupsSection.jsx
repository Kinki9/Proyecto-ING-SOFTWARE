import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Función segura para leer del localStorage
const safeParseJSON = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key}:`, error);
    return defaultValue;
  }
};

const GroupsSection = ({ onNewGroup, onEnterGroup, showOnlyButtons = false }) => {
  const [groups, setGroups] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [activePreviews, setActivePreviews] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  // Inicializar localStorage si no existe
  useEffect(() => {
    if (!localStorage.getItem("forumGroups")) {
      localStorage.setItem("forumGroups", JSON.stringify([]));
    }
    if (!localStorage.getItem("joinedGroups")) {
      localStorage.setItem("joinedGroups", JSON.stringify([]));
    }
    if (!localStorage.getItem("forumPosts")) {
      localStorage.setItem("forumPosts", JSON.stringify([]));
    }
    if (!localStorage.getItem("forumComments")) {
      localStorage.setItem("forumComments", JSON.stringify([]));
    }
  }, []);

  // Cargar datos iniciales de forma segura
  useEffect(() => {
    const storedGroups = safeParseJSON("forumGroups");
    const storedPosts = safeParseJSON("forumPosts");
    const storedComments = safeParseJSON("forumComments");
    const storedJoined = safeParseJSON("joinedGroups");
    
    setGroups(storedGroups);
    setPosts(storedPosts);
    setComments(storedComments);
    setJoinedGroups(storedJoined);
    
    const interval = setInterval(rotatePreviews, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotar las previews
  const rotatePreviews = () => {
    const newPreviews = {};
    groups.forEach(group => {
      const groupPosts = posts.filter(p => p.groupId === group.id);
      if (groupPosts.length > 0) {
        const randomPost = groupPosts[Math.floor(Math.random() * groupPosts.length)];
        const postComments = comments.filter(c => c.postId === randomPost.id);
        newPreviews[group.id] = { post: randomPost, comments: postComments };
      }
    });
    setActivePreviews(newPreviews);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now().toString(),
      name: newGroupName.trim(),
    };

    const updatedGroups = [newGroup, ...groups];
    const updatedJoined = [newGroup.id, ...joinedGroups];
    
    localStorage.setItem("forumGroups", JSON.stringify(updatedGroups));
    localStorage.setItem("joinedGroups", JSON.stringify(updatedJoined));
    
    setGroups(updatedGroups);
    setJoinedGroups(updatedJoined);
    onNewGroup?.();
    setNewGroupName("");
    setShowCreateModal(false);
  };

  const handleJoinGroup = (groupId) => {
    const updatedJoined = [...joinedGroups, groupId];
    localStorage.setItem("joinedGroups", JSON.stringify(updatedJoined));
    setJoinedGroups(updatedJoined);
  };

  const getGroupPreview = (groupId) => {
    if (activePreviews[groupId]) return activePreviews[groupId];
    
    const groupPosts = posts.filter(p => p.groupId === groupId);
    if (groupPosts.length === 0) return null;
    
    const randomPost = groupPosts[Math.floor(Math.random() * groupPosts.length)];
    const postComments = comments.filter(c => c.postId === randomPost.id);
    return { post: randomPost, comments: postComments };
  };

  const renderGroupCard = (group) => {
    const isJoined = joinedGroups.includes(group.id);
    const preview = getGroupPreview(group.id);
    
    return (
      <motion.div
        key={group.id}
        whileHover={{ y: -2 }}
        className="p-4 bg-gray-700 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col"
      >
        <h3 className="text-lg font-medium text-white mb-2">{group.name}</h3>
        
        {preview ? (
          <div className="flex-1 mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={preview.post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <h4 className="text-sm font-semibold text-indigo-300 mb-1">
                  {preview.post.title.length > 30 
                    ? `${preview.post.title.substring(0, 30)}...` 
                    : preview.post.title}
                </h4>
                <p className="text-xs text-gray-300 mb-2">
                  {preview.post.content.length > 100
                    ? `${preview.post.content.substring(0, 100)}...`
                    : preview.post.content}
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <span className="mr-3">
                    {preview.comments.length} comentarios
                  </span>
                  <span>
                    {new Date(preview.post.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm mb-4">
            No hay publicaciones aún
          </div>
        )}
        
        {isJoined ? (
          <button
            onClick={() => onEnterGroup(group.id)}
            className="mt-auto px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors w-full"
          >
            Entrar al grupo
          </button>
        ) : (
          <button
            onClick={() => handleJoinGroup(group.id)}
            className="mt-auto px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors w-full"
          >
            Unirse al grupo
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Grupos de Trabajo</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Crear nuevo grupo
        </button>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-gray-700 rounded-xl p-6 w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Crear nuevo grupo</h3>
              
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Nombre del grupo"
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                autoFocus
              />
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                  disabled={!newGroupName.trim()}
                >
                  Crear
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showOnlyButtons && (
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 pb-2">
              Mis Grupos
            </h3>
            {groups.filter(g => joinedGroups.includes(g.id)).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.filter(g => joinedGroups.includes(g.id)).map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                No estás unido a ningún grupo aún
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 pb-2">
              Grupos Disponibles
            </h3>
            {groups.filter(g => !joinedGroups.includes(g.id)).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.filter(g => !joinedGroups.includes(g.id)).map(renderGroupCard)}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                No hay grupos disponibles para unirse
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GroupsSection;