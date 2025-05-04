import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Satellite, 
  MessageCircle, 
  FileText, 
  Users as GroupsIcon, 
  ShoppingBag, 
  Package,
  Settings,
  Zap,
  Activity,
  TrendingUp,
  AlertCircle
} from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { BarChart, PieChart, LineChart } from "../components/common/Charts";

const OverviewPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [stats, setStats] = useState({
    satellites: 0,
    forumPosts: 0,
    forumComments: 0,
    groups: 0,
    orders: 0
  });

  // Datos de ejemplo para gráficos
  const satelliteStatusData = [
    { name: 'Operacional', value: 15, color: '#10B981' },
    { name: 'Mantenimiento', value: 3, color: '#F59E0B' },
    { name: 'Inactivo', value: 2, color: '#EF4444' }
  ];

  const forumActivityData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Publicaciones',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#8B5CF6'
      },
      {
        label: 'Comentarios',
        data: [30, 42, 10, 15, 8, 12],
        backgroundColor: '#EC4899'
      }
    ]
  };

  const productionTrendData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [
      {
        label: 'Órdenes completadas',
        data: [12, 19, 8, 15],
        borderColor: '#3B82F6',
        fill: false
      }
    ]
  };

  const sections = [
    {
      id: 'satellites',
      title: 'Monitoreo Satelital',
      Icon: Satellite,
      description: 'Resumen del estado actual de los satélites',
      stats: [
        { name: 'Activos', value: `${stats.satellites}`, change: '+2' },
        { name: 'En mantenimiento', value: '3', change: '-1' },
        { name: 'Nuevos proyectos', value: '2', change: '+1' }
      ],
      chart: (
        <div className="h-64">
          <PieChart 
            data={satelliteStatusData} 
            title="Estado de Satélites"
          />
        </div>
      )
    },
    {
      id: 'forum',
      title: 'Foro de Comunicación',
      Icon: MessageCircle,
      description: 'Actividad reciente en el foro interno',
      stats: [
        { name: 'Publicaciones', value: `${stats.forumPosts}`, change: '+12' },
        { name: 'Comentarios', value: `${stats.forumComments}`, change: '+24' },
        { name: 'Grupos activos', value: `${stats.groups}`, change: '+3' }
      ],
      chart: (
        <div className="h-64">
          <BarChart 
            data={forumActivityData} 
            title="Actividad del Foro (últimos 6 meses)"
          />
        </div>
      )
    },
    {
      id: 'orders',
      title: 'Órdenes de Producción',
      Icon: Package,
      description: 'Estado de las órdenes de fabricación',
      stats: [
        { name: 'En proceso', value: `${stats.orders}`, change: '+5' },
        { name: 'Completadas', value: '12', change: '+3' },
        { name: 'Pendientes', value: '4', change: '-2' }
      ],
      chart: (
        <div className="h-64">
          <LineChart 
            data={productionTrendData} 
            title="Tendencia de Producción (último mes)"
          />
        </div>
      )
    }
  ];

  useEffect(() => {
    const loadStats = () => {
      try {
        const satellites = JSON.parse(localStorage.getItem('satellites') || '[]');
        const forumPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
        const forumComments = JSON.parse(localStorage.getItem('forumComments') || '[]');
        const forumGroups = JSON.parse(localStorage.getItem('forumGroups') || '[]');
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        setStats({
          satellites: satellites.length,
          forumPosts: forumPosts.length,
          forumComments: forumComments.length,
          groups: forumGroups.length,
          orders: orders.length
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-800'>
      <Header title='Centro de Control General' subtitle="Vista general del sistema" />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Estadísticas principales */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard 
            name='Satélites Activos' 
            icon={Satellite} 
            value={stats.satellites} 
            color='#6366F1' 
            description="En operación actualmente"
            trend="up"
          />
          <StatCard 
            name='Publicaciones' 
            icon={FileText} 
            value={stats.forumPosts} 
            color='#8B5CF6' 
            description="En el foro interno"
            trend="up"
          />
          <StatCard 
            name='Grupos de Trabajo' 
            icon={GroupsIcon} 
            value={stats.groups} 
            color='#EC4899' 
            description="Equipos activos"
            trend="neutral"
          />
          <StatCard 
            name='Órdenes Activas' 
            icon={ShoppingBag} 
            value={stats.orders} 
            color='#10B981' 
            description="En producción"
            trend="down"
          />
        </motion.div>

        {/* Sección de alertas y métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-700 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <Activity className="text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Actividad del Sistema</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">CPU Usage</span>
                <span className="font-medium text-white">42%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-green-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Tendencias</h3>
            </div>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-gray-300">Usuarios</p>
                <p className="text-xl font-bold text-white">+24%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">Productividad</p>
                <p className="text-xl font-bold text-white">+15%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">Eficiencia</p>
                <p className="text-xl font-bold text-white">+8%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-yellow-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Alertas Recientes</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-2 w-2 mt-1.5 rounded-full bg-yellow-400"></div>
                <p className="ml-2 text-sm text-gray-300">Satélite #42 requiere mantenimiento</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-2 w-2 mt-1.5 rounded-full bg-red-400"></div>
                <p className="ml-2 text-sm text-gray-300">Retraso en orden #2157</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carrusel de secciones */}
        <div className="mb-8 relative bg-gray-700 rounded-xl shadow-md p-6 min-h-[400px]">
          <h2 className="text-xl font-semibold text-white mb-4">Resumen de Secciones</h2>
          
          <AnimatePresence mode='wait'>
            <motion.div
              key={sections[currentSection].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6"
            >
              <div className="flex flex-col md:w-1/2">
                <div className="flex items-center p-4 bg-indigo-900 rounded-lg mb-4">
                  {React.createElement(sections[currentSection].Icon, {
                    className: "size-16 text-indigo-300"
                  })}
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white">
                      {sections[currentSection].title}
                    </h3>
                    <p className="text-indigo-200">
                      {sections[currentSection].description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {sections[currentSection].stats.map((stat, index) => (
                    <div key={index} className="bg-gray-600 p-4 rounded-lg">
                      <p className="text-sm text-gray-300">{stat.name}</p>
                      <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-semibold text-white">
                          {stat.value}
                        </span>
                        <span 
                          className={`ml-2 text-sm ${
                            stat.change.startsWith('+') 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2">
                {sections[currentSection].chart}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Indicadores del carrusel */}
          <div className="flex justify-center mt-6 space-x-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSection === index ? 'bg-indigo-400' : 'bg-gray-500'
                }`}
                aria-label={`Ir a ${sections[index].title}`}
              />
            ))}
          </div>
        </div>

        {/* Sección de actividad reciente */}
        <div className="bg-gray-700 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Actividad Reciente</h2>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              Ver todo
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start p-4 bg-gray-600 rounded-lg">
                <div className="flex-shrink-0 p-2 bg-indigo-900 rounded-full mr-4">
                  <Zap className="size-5 text-indigo-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    Nueva actualización del sistema #{item}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Hace {item} {item === 1 ? 'hora' : 'horas'}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;