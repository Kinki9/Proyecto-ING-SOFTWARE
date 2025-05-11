import { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAuthModal = ({ isOpen, onClose, onAuthenticate }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // En una implementación real, esto haría una llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validación de ejemplo (en producción usar autenticación real)
      if (credentials.username === 'admin' && 
          credentials.password === 'SecurePass123!' && 
          credentials.otp === '123456') {
        onAuthenticate(true);
      } else {
        setError('Credenciales incorrectas. Intente nuevamente.');
      }
    } catch (err) {
      setError('Error de conexión. Intente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative border border-gray-700"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-900/20 mb-4">
            <Lock className="h-6 w-6 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Autenticación Requerida</h2>
          <p className="text-gray-400">
            Ingrese las credenciales administrativas para continuar
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Usuario Administrativo
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              autoComplete="current-password"
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-1">
              Código OTP (6 dígitos)
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={credentials.otp}
              onChange={handleChange}
              pattern="\d{6}"
              maxLength={6}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              placeholder="123456"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Verificando...' : 'Acceder al Panel'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Esta área está restringida al personal autorizado.</p>
          <p className="mt-1">Todas las acciones son registradas.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminAuthModal;