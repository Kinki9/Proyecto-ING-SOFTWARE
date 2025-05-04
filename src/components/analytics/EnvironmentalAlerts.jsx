import { motion } from "framer-motion";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const alertsData = [
  {
    id: 1,
    type: "high",
    title: "Alto consumo de energía en SAT-042",
    message: "El satélite SAT-042 muestra un consumo 25% superior al promedio",
    timestamp: "2023-11-15T14:30:00Z",
    resolved: false
  },
  {
    id: 2,
    type: "medium",
    title: "Temperatura crítica en base Antártica",
    message: "Sistema de refrigeración operando al 92% de capacidad",
    timestamp: "2023-11-14T09:15:00Z",
    resolved: false
  },
  {
    id: 3,
    type: "low",
    title: "Aumento en residuos peligrosos",
    message: "Incremento del 15% en residuos categoría H3",
    timestamp: "2023-11-12T16:45:00Z",
    resolved: true
  }
];

const EnvironmentalAlerts = () => {
  const [expanded, setExpanded] = useState(true);
  const [alerts, setAlerts] = useState(alertsData);

  const resolveAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? {...alert, resolved: true} : alert
    ));
  };

  const getAlertColor = (type) => {
    switch(type) {
      case "high": return "bg-red-900 bg-opacity-50 border-red-700";
      case "medium": return "bg-yellow-900 bg-opacity-50 border-yellow-700";
      default: return "bg-orange-900 bg-opacity-50 border-orange-700";
    }
  };

  const getAlertIconColor = (type) => {
    switch(type) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      default: return "text-orange-500";
    }
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="flex items-center justify-between bg-gray-800 p-4 rounded-t-lg cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <AlertTriangle className="text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-100">
            Alertas Ambientales
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {alerts.filter(a => !a.resolved).length} activas
            </span>
          </h3>
        </div>
        {expanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </div>

      {expanded && (
        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-b-lg divide-y divide-gray-700">
          {alerts.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No hay alertas activas
            </div>
          ) : (
            alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-4 ${getAlertColor(alert.type)} ${alert.resolved ? 'opacity-60' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <AlertTriangle className={`mt-1 mr-3 ${getAlertIconColor(alert.type)}`} />
                    <div>
                      <h4 className="font-medium text-gray-100">{alert.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(alert.timestamp).toLocaleString()}
                        {alert.resolved && <span className="ml-2 text-green-500">Resuelta</span>}
                      </p>
                    </div>
                  </div>
                  {!alert.resolved && (
                    <button 
                      onClick={() => resolveAlert(alert.id)}
                      className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
                    >
                      Marcar como resuelta
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EnvironmentalAlerts;