import { Bell } from 'lucide-react';

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <Bell className="h-5 w-5 mr-2" />
        Configuración de Notificaciones
      </h2>
      
      <div className="bg-gray-700 p-4 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">Alertas del Sistema</h3>
            <p className="text-sm text-gray-400">Notificaciones críticas del sistema</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">Actualizaciones de Seguridad</h3>
            <p className="text-sm text-gray-400">Alertas de vulnerabilidades</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">Reportes Diarios</h3>
            <p className="text-sm text-gray-400">Resumen de actividad del sistema</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;