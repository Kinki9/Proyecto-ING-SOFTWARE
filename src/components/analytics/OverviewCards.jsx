import { motion } from "framer-motion";
import { Satellite, Recycle, Leaf, Factory } from "lucide-react";

const overviewData = [
  { 
    name: "Satélites Activos", 
    value: "24", 
    change: 8.3, 
    icon: Satellite,
    description: "En operación actualmente" 
  },
  { 
    name: "Material Reciclado", 
    value: "78%", 
    change: 12.5, 
    icon: Recycle,
    description: "Del total utilizado" 
  },
  { 
    name: "Reducción CO₂", 
    value: "35%", 
    change: 15.7, 
    icon: Leaf,
    description: "Vs año anterior" 
  },
  { 
    name: "Proyectos Activos", 
    value: "7", 
    change: -2.1, 
    icon: Factory,
    description: "En desarrollo" 
  },
];

const OverviewCards = () => {
  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
      {overviewData.map((item, index) => (
        <motion.div
          key={item.name}
          className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm font-medium text-gray-400'>{item.name}</h3>
              <p className='mt-1 text-2xl font-semibold text-gray-100'>{item.value}</p>
              <p className='text-xs text-gray-500 mt-1'>{item.description}</p>
            </div>
            <div className={`p-3 rounded-full bg-opacity-20 ${item.change >= 0 ? "bg-green-500" : "bg-red-500"}`}>
              <item.icon className={`size-6 ${item.change >= 0 ? "text-green-500" : "text-red-500"}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;