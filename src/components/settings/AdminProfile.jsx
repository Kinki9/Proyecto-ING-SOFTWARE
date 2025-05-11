import { UserCog } from 'lucide-react';

const AdminProfile = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <UserCog className="h-5 w-5 mr-2" />
        Perfil Administrativo
      </h2>
      
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
              defaultValue="Administrador Principal"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
              defaultValue="admin@aeroespacial.com"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Rol Administrativo
          </label>
          <select className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white">
            <option>Super Administrador</option>
            <option>Administrador de Seguridad</option>
            <option>Administrador de Sistema</option>
          </select>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Actualizar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;