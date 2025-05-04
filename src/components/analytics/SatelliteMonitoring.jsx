import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { AlertTriangle } from "lucide-react"; // Importación añadida

const SatelliteMonitoring = ({ satellite }) => {
  const performanceData = [
    { subject: 'Energía', A: satellite ? 120 : 0, fullMark: 150 },
    { subject: 'Comunicación', A: satellite ? 95 : 0, fullMark: 150 },
    { subject: 'Temperatura', A: satellite ? 85 : 0, fullMark: 150 },
    { subject: 'Orientación', A: satellite ? 110 : 0, fullMark: 150 },
    { subject: 'Propulsión', A: satellite ? 75 : 0, fullMark: 150 },
  ];

  {alert.satellite?.id === satellite?.id && (
    <div className="mt-4 p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg flex items-start">
      <AlertTriangle className="text-red-500 mr-3 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-red-300">Alerta crítica</h4>
        <p className="text-sm text-red-200">
          {alert.message} - {new Date(alert.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )}

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>
        {satellite ? `Monitoreo: ${satellite.name}` : 'Seleccione un satélite'}
      </h2>

      {satellite ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Estado</p>
              <p className="text-green-400 font-medium">Operacional</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Temperatura</p>
              <p className="text-blue-400 font-medium">24°C</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Batería</p>
              <p className="text-yellow-400 font-medium">78%</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Última Com.</p>
              <p className="text-purple-400 font-medium">Hace 2 min</p>
            </div>
          </div>

          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#9CA3AF" />
                <Radar name="Performance" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-gray-400">
              <thead className="text-xs text-gray-300 bg-gray-700">
                <tr>
                  <th className="px-4 py-2">Parámetro</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Rango Óptimo</th>
                  <th className="px-4 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2">Energía Solar</td>
                  <td className="px-4 py-2">1245 W</td>
                  <td className="px-4 py-2">1000-1500 W</td>
                  <td className="px-4 py-2 text-green-400">Normal</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2">Temperatura Interna</td>
                  <td className="px-4 py-2">24°C</td>
                  <td className="px-4 py-2">15-30°C</td>
                  <td className="px-4 py-2 text-green-400">Normal</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2">Presión Combustible</td>
                  <td className="px-4 py-2">3.2 MPa</td>
                  <td className="px-4 py-2">2.8-3.5 MPa</td>
                  <td className="px-4 py-2 text-yellow-400">Atención</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Velocidad Orbital</td>
                  <td className="px-4 py-2">7.5 km/s</td>
                  <td className="px-4 py-2">7.4-7.6 km/s</td>
                  <td className="px-4 py-2 text-green-400">Normal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>Seleccione un satélite de la lista para ver los datos de monitoreo</p>
        </div>
      )}
    </motion.div>
  );
};

export default SatelliteMonitoring;