import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GroupsSection = ({ onNewGroup, onEnterGroup, showOnlyButtons = false }) => {
  const [groups, setGroups] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("forumGroups") || "[]");
    setGroups(storedGroups);
  }, []);

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now().toString(),
      name: newGroupName.trim(),
    };

    const updated = [newGroup, ...groups];
    localStorage.setItem("forumGroups", JSON.stringify(updated));
    setGroups(updated);
    onNewGroup?.();
    setNewGroupName("");
    setShowCreateModal(false);
  };

  return (
    <section className="relative">
      <h2 className="text-xl font-semibold mb-4 text-white">Grupos de Trabajo</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Crear nuevo grupo
        </button>
      </div>

      {/* Modal para crear grupo */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              whileHover={{ y: -2 }}
              className="p-4 bg-gray-700 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-medium text-white mb-2">{group.name}</h3>
              <button
                onClick={() => onEnterGroup(group.id)}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Entrar
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GroupsSection;