import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCog, Bell, Link2, AlertTriangle, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

import Header from "../components/common/Header";
import AdminProfile from "../components/settings/AdminProfile";
import NotificationSettings from "../components/settings/NotificationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import ConnectedServices from "../components/settings/ConnectedServices";
import SystemControls from "../components/settings/SystemControls";
import AccessLogs from "../components/settings/AccessLogs";
import AdminAuthModal from '../components/settings/AdminAuthModal';
import DangerZone from '../components/settings/DangerZone';

const SettingsPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [accessLogs, setAccessLogs] = useState([]);
  const navigate = useNavigate();

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAdminAuth = async () => {
      // En una implementación real, verificaría con el backend
      const adminToken = localStorage.getItem('adminAuthToken');
      if (adminToken) {
        setIsAdmin(true);
        setShowAuthModal(false);
        logAccess('Acceso autorizado a configuración');
      } else {
        logAccess('Intento de acceso no autorizado a configuración');
      }
    };

    checkAdminAuth();
  }, []);

  const logAccess = (action) => {
    const newLog = {
      timestamp: new Date().toISOString(),
      action,
      ip: '192.168.1.1', // Esto vendría del backend en producción
      userAgent: navigator.userAgent
    };
    setAccessLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const handleAdminAuth = (success) => {
    if (success) {
      setIsAdmin(true);
      setShowAuthModal(false);
      localStorage.setItem('adminAuthToken', 'dummy-token'); // Solo para demostración
      logAccess('Autenticación administrativa exitosa');
    } else {
      logAccess('Intento de autenticación fallido');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    setIsAdmin(false);
    setShowAuthModal(true);
    logAccess('Sesión administrativa cerrada');
    navigate('/');
  };

  if (!isAdmin) {
    return (
      <div className='flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen'>
        <Header title='Configuración del Sistema' />
        <AdminAuthModal 
          isOpen={showAuthModal} 
          onClose={() => navigate('/')}
          onAuthenticate={handleAdminAuth}
        />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Perfil Administrativo', icon: UserCog },
    { id: 'notifications', name: 'Config. Notificaciones', icon: Bell },
    { id: 'security', name: 'Seguridad del Sistema', icon: Lock },
    { id: 'services', name: 'Servicios Conectados', icon: Link2 },
    { id: 'system', name: 'Controles del Sistema', icon: Settings },
    { id: 'access', name: 'Registros de Acceso', icon: Shield },
    { id: 'danger', name: 'Zona de Alto Riesgo', icon: AlertTriangle }
  ];

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen'>
      <Header title='Panel de Administración'>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </Header>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Barra de navegación lateral */}
        <div className="flex flex-col md:flex-row gap-6">
          <nav className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configuración
              </h2>
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-colors ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <tab.icon className="h-4 w-4 mr-3" />
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Contenido principal */}
          <div className="flex-1 bg-gray-800 rounded-lg p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && <AdminProfile />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'services' && <ConnectedServices />}
              {activeTab === 'system' && <SystemControls />}
              {activeTab === 'access' && <AccessLogs logs={accessLogs} />}
              {activeTab === 'danger' && <DangerZone />}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;