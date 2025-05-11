import { Shield, Clock, User, Monitor } from 'lucide-react';

const AccessLogs = ({ logs }) => {
  const sampleLogs = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      action: "Acceso autorizado a configuración",
      ip: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      action: "Intento de acceso fallido",
      ip: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X)"
    },
    ...(logs || [])
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <Shield className="h-5 w-5 mr-2" />
        Registros de Acceso
      </h2>
      
      <div className="bg-gray-700 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Fecha/Hora
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Acción
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <div className="flex items-center">
                  <Monitor className="h-4 w-4 mr-1" />
                  Dispositivo/IP
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {sampleLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{formatDate(log.timestamp)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm ${log.action.includes('fallido') ? 'text-red-400' : 'text-green-400'}`}>
                    {log.action}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">
                    <div>{log.ip}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">{log.userAgent}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 text-sm">
          Exportar Registros
        </button>
        <div className="text-sm text-gray-400">
          Mostrando {sampleLogs.length} registros
        </div>
      </div>
    </div>
  );
};

export default AccessLogs;