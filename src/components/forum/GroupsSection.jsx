import React, { useState, useEffect } from "react";

// Áreas específicas para la industria aeroespacial
const areaOptions = [
  "Ingeniería Aeroespacial",
  "Control de Misión",
  "Operaciones de Vuelo",
  "Sistemas de Propulsión",
  "Carga Útil y Experimentos",
  "Seguridad y Mantenimiento",
  "Análisis de Datos",
  "Administración de Proyectos"
];

const GroupsSection = ({ onNewGroup }) => {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("forumGroups");
    return saved ? JSON.parse(saved) : [];
  });

  const [newGroup, setNewGroup] = useState({
    name: "",
    area: areaOptions[0],
    description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("forumGroups", JSON.stringify(groups));
  }, [groups]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (newGroup.name.trim() === "" || newGroup.description.trim() === "") {
      alert("Por favor, complete el nombre y descripción del grupo.");
      return;
    }
    
    if (groups.some((g) => g.name.toLowerCase() === newGroup.name.trim().toLowerCase())) {
      alert("Ya existe un grupo con ese nombre.");
      return;
    }

    const groupToAdd = {
      id: Date.now(),
      name: newGroup.name.trim(),
      area: newGroup.area,
      description: newGroup.description.trim(),
      membersCount: 1, // El creador es el primer miembro
      created: new Date().toISOString()
    };
    
    setGroups((prev) => [groupToAdd, ...prev]);
    setNewGroup({
      name: "",
      area: areaOptions[0],
      description: "",
    });
    
    onNewGroup(); // Notificar a ForumPage del nuevo grupo
  };

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Grupos de Trabajo</h2>
      <p className="text-gray-600 mb-4">Crea o únete a grupos de colaboración por área especializada.</p>

      {/* Buscador de grupos */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar grupo por nombre o área..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          aria-label="Buscar grupo por nombre o área"
        />
      </div>

      {/* Formulario agregar nuevo grupo */}
      <form
        onSubmit={handleAddGroup}
        className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-slate-700"
        aria-label="Agregar nuevo grupo"
      >
        <h3 className="text-lg font-medium text-gray-800 mb-3">Crear Nuevo Grupo</h3>
        
        <input
          type="text"
          name="name"
          placeholder="Nombre del grupo (ej: Equipo de Cohetes)"
          value={newGroup.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          required
          aria-label="Nombre del grupo"
        />
        
        <select
          name="area"
          value={newGroup.area}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Área del grupo"
          required
        >
          {areaOptions.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        
        <textarea
          name="description"
          placeholder="Descripción del grupo (objetivos, temas de discusión, etc.)"
          value={newGroup.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          aria-label="Descripción del grupo"
        />
        
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Crear grupo de trabajo
        </button>
      </form>

      {/* Lista de grupos */}
      <div className="space-y-4 max-h-96 overflow-auto">
        {filteredGroups.length === 0 ? (
          <p className="text-gray-600 p-4 bg-gray-50 rounded-lg text-center">
            {searchTerm ? "No hay grupos que coincidan con la búsqueda." : "No hay grupos creados aún."}
          </p>
        ) : (
          filteredGroups.map(({ id, name, area, description, membersCount, created }) => (
            <article
              key={id}
              className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              aria-label={`Grupo ${name} en área de ${area}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-indigo-700 font-semibold mb-1">{name}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full mb-2">
                    {area}
                  </span>
                </div>
                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {membersCount} {membersCount === 1 ? "miembro" : "miembros"}
                </span>
              </div>
              
              <p className="text-gray-700 mb-2">{description}</p>
              
              <div className="flex justify-between items-center mt-3">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Unirse al grupo
                </button>
                <time 
                  className="text-xs text-gray-400" 
                  dateTime={created}
                  title={new Date(created).toLocaleString()}
                >
                  Creado: {new Date(created).toLocaleDateString()}
                </time>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default GroupsSection;