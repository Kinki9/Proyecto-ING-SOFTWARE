import React, { useState } from "react";
import { Users, Plus } from "lucide-react";

const GroupsSection = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Ingeniería Aeroespacial",
      description: "Equipo encargado del diseño y análisis de naves espaciales.",
    },
    {
      id: 2,
      name: "Soporte Técnico",
      description: "Grupo especializado en mantenimiento y resolución de problemas técnicos.",
    },
  ]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleAddGroup = (e) => {
    e.preventDefault();
    const trimmedName = newGroupName.trim();
    const trimmedDescription = newGroupDescription.trim();
    if (!trimmedName || !trimmedDescription) return;

    const newGroup = {
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
    };

    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setNewGroupDescription("");
    setSelectedGroupId(newGroup.id);
  };

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  return (
    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Grupos de Trabajo</h2>

      <form onSubmit={handleAddGroup} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre del grupo"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          required
          maxLength={50}
        />
        <textarea
          rows="3"
          placeholder="Descripción del grupo"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          value={newGroupDescription}
          onChange={(e) => setNewGroupDescription(e.target.value)}
          required
          maxLength={200}
        />
        <button
          type="submit"
          disabled={!newGroupName.trim() || !newGroupDescription.trim()}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-md transition"
        >
          <Plus className="mr-2 h-5 w-5" />
          Crear Grupo
        </button>
      </form>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Lista de grupos */}
        <ul className="flex-1 max-h-[360px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-900">
          {groups.length === 0 && (
            <li className="text-gray-500 dark:text-gray-400 text-center py-4">
              No hay grupos creados aún.
            </li>
          )}
          {groups.map(({ id, name, description }) => (
            <li
              key={id}
              className={`cursor-pointer p-3 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900 ${
                id === selectedGroupId ? "bg-indigo-200 dark:bg-indigo-800 font-semibold" : ""
              }`}
              onClick={() => setSelectedGroupId(id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedGroupId(id);
                }
              }}
              aria-selected={id === selectedGroupId}
              role="option"
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span>{name}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">{description}</p>
            </li>
          ))}
        </ul>

        {/* Detalle del grupo seleccionado */}
        <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-md shadow max-h-[360px] overflow-y-auto">
          {selectedGroup ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{selectedGroup.name}</h3>
              <p className="text-gray-800 dark:text-gray-200">{selectedGroup.description}</p>

              {/* Aquí puedes agregar más detalles o funcionalidades relacionadas al grupo */}
              <p className="mt-4 italic text-sm text-gray-600 dark:text-gray-400">
                Aquí puedes mostrar los miembros del grupo, publicaciones relacionadas, etc.
              </p>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">Selecciona un grupo para ver detalles</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GroupsSection;