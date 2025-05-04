import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const materialData = [
  { name: 'Aluminio', used: 4500, recycled: 3800 },
  { name: 'Titanio', used: 3200, recycled: 2800 },
  { name: 'Compuestos', used: 2800, recycled: 2200 },
  { name: 'Aleaciones', used: 1800, recycled: 1500 },
  { name: 'Fibra Carbono', used: 1200, recycled: 900 },
];

const MaterialUsage = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Uso de Materiales (kg)</h2>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={materialData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey="used" name="Utilizado" fill="#8B5CF6" />
            <Bar dataKey="recycled" name="Reciclado" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p><span className="inline-block w-3 h-3 bg-purple-500 mr-1"></span> Material utilizado en producción</p>
        <p><span className="inline-block w-3 h-3 bg-green-500 mr-1"></span> Material reciclado/reutilizado</p>
      </div>
    </motion.div>
  );
};

export default MaterialUsage;