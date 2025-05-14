import React, { useEffect, useState } from "react";

const GroupsSection = ({ onNewGroup, onEnterGroup, showOnlyButtons = false }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("forumGroups") || "[]");
    setGroups(storedGroups);
  }, []);

  const handleCreateGroup = () => {
    const name = prompt("Nombre del grupo:");
    if (!name?.trim()) return;

    const newGroup = {
      id: Date.now().toString(),
      name: name.trim(),
    };

    const updated = [newGroup, ...groups];
    localStorage.setItem("forumGroups", JSON.stringify(updated));
    setGroups(updated);
    onNewGroup?.();
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Grupos de Trabajo</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleCreateGroup}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Crear nuevo grupo
        </button>
      </div>

      {showOnlyButtons && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-4 border rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium mb-2">{group.name}</h3>
              <button
                onClick={() => onEnterGroup(group.id)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Entrar
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GroupsSection;