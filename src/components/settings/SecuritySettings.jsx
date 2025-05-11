import { Lock, Shield, Key } from 'lucide-react';
import { useState } from 'react';

const SecuritySettings = () => {
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <Shield className="h-5 w-5 mr-2" />
        Configuración de Seguridad
      </h2>
      
      <div className="bg-gray-700 p-4 rounded-lg space-y-6">
        <div>
          <h3 className="font-medium text-white mb-4 flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Cambiar Contraseña
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña Actual
              </label>
              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nueva Contraseña
              </label>
              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-white mb-4 flex items-center">
            <Key className="h-4 w-4 mr-2" />
            Autenticación de Dos Factores
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Estado: <span className="text-green-400">Activado</span></p>
              <p className="text-sm text-gray-400">Protección adicional para tu cuenta</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
              Configurar 2FA
            </button>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;