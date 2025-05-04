// components/forum/ForumGroupSelector.jsx
import { useState } from "react";

const groups = [
  "Todos",
  "Ingeniería de satélites",
  "Ingeniería de cohetes",
  "Sistemas de comunicación",
  "Control de calidad",
  "Diseño y simulación"
];

const ForumGroupSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState("Todos");

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onSelect) onSelect(e.target.value);
  };

  return (
    <div className="w-full max-w-sm">
      <label className="block text-sm font-medium text-gray-300 mb-1">Área de trabajo</label>
      <select
        className="w-full rounded-lg bg-gray-700 text-white px-3 py-2 border border-gray-600"
        value={selected}
        onChange={handleChange}
      >
        {groups.map((group) => (
          <option key={group}>{group}</option>
        ))}
      </select>
    </div>
  );
};

export default ForumGroupSelector;



