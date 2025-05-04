import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const environmentalData = [
  { month: "Ene", co2: 450, waste: 120, energy: 850 },
  { month: "Feb", co2: 420, waste: 110, energy: 820 },
  { month: "Mar", co2: 380, waste: 95, energy: 780 },
  { month: "Abr", co2: 350, waste: 85, energy: 750 },
  { month: "May", co2: 320, waste: 75, energy: 720 },
  { month: "Jun", co2: 300, waste: 65, energy: 700 },
];

const EnvironmentalImpactChart = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-6'>Impacto Ambiental Mensual</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-green-400 text-sm">Reducción de CO₂</h3>
          <p className="text-white text-2xl">25%</p>
          <p className="text-gray-400 text-xs">vs año anterior</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-blue-400 text-sm">Residuos Reciclados</h3>
          <p className="text-white text-2xl">78%</p>
          <p className="text-gray-400 text-xs">del total generado</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-purple-400 text-sm">Energía Renovable</h3>
          <p className="text-white text-2xl">65%</p>
          <p className="text-gray-400 text-xs">del consumo total</p>
        </div>
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <AreaChart data={environmentalData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='month' stroke='#9CA3AF' />
            <YAxis stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Area type='monotone' dataKey='co2' name='Emisiones CO₂ (kg)' stroke='#F59E0B' fill='#F59E0B' fillOpacity={0.3} />
            <Area type='monotone' dataKey='waste' name='Residuos (kg)' stroke='#10B981' fill='#10B981' fillOpacity={0.3} />
            <Area type='monotone' dataKey='energy' name='Energía (kWh)' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// Agrega al final del componente, antes del export:
<div className="mt-4">
  <div className="flex items-center text-sm text-gray-400">
    <AlertTriangle className="text-yellow-500 mr-1 size-4" />
    <span>Alerta: Emisiones de CO₂ aumentaron 5% en la última semana</span>
  </div>
</div>

export default EnvironmentalImpactChart;