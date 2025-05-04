import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Check, X, Wifi, WifiOff } from 'lucide-react';

const SatelliteList = ({ onSelectSatellite, selectedSatellite }) => {
  const [satellites, setSatellites] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    const mockSatellites = [
      { id: 'SAT-001', name: 'EcoSat-1', status: 'active', launchDate: '2023-01-15', materials: ['Aluminio', 'Compuestos'] },
      { id: 'SAT-002', name: 'GeoScan-2', status: 'maintenance', launchDate: '2023-03-22', materials: ['Titanio', 'Fibra de carbono'] },
      { id: 'SAT-003', name: 'Atmos-3', status: 'active', launchDate: '2023-05-10', materials: ['Aleaciones', 'Compuestos'] },
      { id: 'SAT-004', name: 'BioOrbit-4', status: 'inactive', launchDate: '2023-07-18', materials: ['Aluminio', 'Titanio'] },
    ];
    setSatellites(mockSatellites);
    if (mockSatellites.length > 0 && !selectedSatellite) {
      onSelectSatellite(mockSatellites[0]);
    }
  }, [onSelectSatellite, selectedSatellite]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Wifi className="text-green-500" />;
      case 'maintenance': return <Wifi className="text-yellow-500" />;
      case 'inactive': return <WifiOff className="text-red-500" />;
      default: return <Wifi className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>Satélites Registrados</h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {satellites.map(satellite => (
          <div 
            key={satellite.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${selectedSatellite?.id === satellite.id ? 'bg-indigo-900 bg-opacity-50' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => onSelectSatellite(satellite)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Satellite className="text-indigo-400" />
                <div>
                  <h3 className="font-medium text-white">{satellite.name}</h3>
                  <p className="text-xs text-gray-400">{satellite.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(satellite.status)}
                <span className="text-xs text-gray-300">
                  {new Date(satellite.launchDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {satellite.materials.map(material => (
                <span key={material} className="text-xs px-2 py-1 bg-gray-600 rounded-full text-gray-200">
                  {material}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
        + Registrar Nuevo Satélite
      </button>
    </motion.div>
  );
};

export default SatelliteList;