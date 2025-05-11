import { Link2, Github, Mail, HardDrive } from 'lucide-react';

const services = [
  {
    id: 1,
    name: "GitHub",
    icon: <Github className="h-5 w-5" />,
    connected: true,
    lastUsed: "Hace 2 horas"
  },
  {
    id: 2,
    name: "Correo Corporativo",
    icon: <Mail className="h-5 w-5" />,
    connected: true,
    lastUsed: "Hace 1 día"
  },
  {
    id: 3,
    name: "Almacenamiento",
    icon: <HardDrive className="h-5 w-5" />,
    connected: false,
    lastUsed: "Nunca"
  }
];

const ConnectedServices = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <Link2 className="h-5 w-5 mr-2" />
        Servicios Conectados
      </h2>
      
      <div className="bg-gray-700 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Servicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Último Uso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{service.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.connected ? 'bg-green-900 text-green-100' : 'bg-gray-600 text-gray-200'}`}>
                    {service.connected ? 'Conectado' : 'Desconectado'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {service.lastUsed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {service.connected ? (
                    <button className="text-red-400 hover:text-red-300">Desconectar</button>
                  ) : (
                    <button className="text-indigo-400 hover:text-indigo-300">Conectar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-center">
        <button className="text-sm text-indigo-400 hover:text-indigo-300">
          + Añadir nuevo servicio
        </button>
      </div>
    </div>
  );
};

export default ConnectedServices;