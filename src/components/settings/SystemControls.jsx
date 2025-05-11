import { Settings, Server, Database, Cpu } from 'lucide-react';
import { useState } from 'react';

const SystemControls = () => {
  const [systemStatus, setSystemStatus] = useState({
    maintenance: false,
    backups: true,
    analytics: true
  });

  const toggleSetting = (setting) => {
    setSystemStatus(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <Settings className="h-5 w-5 mr-2" />
        Controles del Sistema
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <Server className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="font-medium text-white">Estado del Servidor</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Modo Mantenimiento</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={systemStatus.maintenance}
                  onChange={() => toggleSetting('maintenance')}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Respaldos Automáticos</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={systemStatus.backups}
                  onChange={() => toggleSetting('backups')}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Recolección de Datos</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={systemStatus.analytics}
                  onChange={() => toggleSetting('analytics')}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 mr-2 text-green-400" />
            <h3 className="font-medium text-white">Base de Datos</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tamaño</span>
              <span className="text-white">2.4 GB</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Último Respaldo</span>
              <span className="text-white">Hace 12 horas</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Estado</span>
              <span className="text-green-400">Operacional</span>
            </div>
          </div>
          
          <div className="mt-6 space-x-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
              Optimizar DB
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 text-sm">
              Respaldar Ahora
            </button>
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg md:col-span-2">
          <div className="flex items-center mb-4">
            <Cpu className="h-5 w-5 mr-2 text-purple-400" />
            <h3 className="font-medium text-white">Acciones del Sistema</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-md text-sm">
              Limpiar Caché
            </button>
            <button className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-md text-sm">
              Reindexar Datos
            </button>
            <button className="px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md text-sm">
              Reiniciar Servicios
            </button>
            <button className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-md text-sm">
              Apagar Sistema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemControls;