import { AlertTriangle, Trash2, Archive, Power } from 'lucide-react';
import { useState } from 'react';

const DangerZone = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const dangerousActions = [
    {
      id: 1,
      title: "Eliminar todos los datos",
      description: "Eliminará permanentemente todos los datos del sistema. Esta acción no se puede deshacer.",
      icon: <Trash2 className="h-5 w-5 text-red-500" />,
      buttonText: "Eliminar Todo",
      confirmText: "ELIMINAR-TODO"
    },
    {
      id: 2,
      title: "Archivar base de datos",
      description: "Creará un archivo comprimido con todos los datos actuales y reiniciará el sistema.",
      icon: <Archive className="h-5 w-5 text-yellow-500" />,
      buttonText: "Archivar y Reiniciar",
      confirmText: "ARCHIVAR-DATOS"
    },
    {
      id: 3,
      title: "Apagar el sistema",
      description: "Apagará completamente el sistema. Necesitará acceso físico para volver a encenderlo.",
      icon: <Power className="h-5 w-5 text-purple-500" />,
      buttonText: "Apagar Sistema",
      confirmText: "APAGAR-SISTEMA"
    }
  ];

  const handleAction = (action) => {
    if (confirmText !== action.confirmText) return;
    
    setIsDeleting(true);
    // Simular acción peligrosa
    setTimeout(() => {
      alert(`Acción "${action.title}" completada`);
      setIsDeleting(false);
      setConfirmText('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
        Zona de Alto Riesgo
      </h2>
      
      <div className="space-y-4">
        {dangerousActions.map((action) => (
          <div key={action.id} className="bg-gray-700 border border-red-900/50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Escribe "${action.confirmText}" para confirmar`}
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white flex-1 text-sm"
                  />
                  <button
                    onClick={() => handleAction(action)}
                    disabled={confirmText !== action.confirmText || isDeleting}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${isDeleting ? 'bg-gray-500 cursor-not-allowed' : confirmText === action.confirmText ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                  >
                    {isDeleting ? 'Procesando...' : action.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
        <p className="text-red-400 text-sm">
          <AlertTriangle className="h-4 w-4 inline mr-1" />
          Advertencia: Las acciones en esta sección son irreversibles y pueden afectar todo el sistema.
          Realice estas operaciones solo si está completamente seguro.
        </p>
      </div>
    </div>
  );
};

export default DangerZone;