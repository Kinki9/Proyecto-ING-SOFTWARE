import { useState, useEffect, useRef } from "react";
import { MessageCircle, Users, FileText, Globe, Rocket, Bell, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tab } from '@headlessui/react';
import axios from 'axios';

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CommentsSection from "../components/forum/CommentsSection";
import PostSection from "../components/forum/PostSection";
import GroupsSection from "../components/forum/GroupsSection";
import NewsSection from "../components/forum/NewsSection";

const ForumPage = () => {
  const [forumStats, setForumStats] = useState({
    totalComments: 0,
    totalPosts: 0,
    totalGroups: 0,
    unreadNotifications: 0
  });

  const [activeTab, setActiveTab] = useState('posts');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);
  const [newsCount, setNewsCount] = useState(0);

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      const comments = JSON.parse(localStorage.getItem("forumComments") || "[]");
      const posts = JSON.parse(localStorage.getItem("forumPosts") || "[]");
      const groups = JSON.parse(localStorage.getItem("forumGroups") || "[]");
      const savedNotifications = JSON.parse(localStorage.getItem("forumNotifications") || "[]");
      
      setForumStats({
        totalComments: comments.length,
        totalPosts: posts.length,
        totalGroups: groups.length,
        unreadNotifications: savedNotifications.filter(n => !n.read).length
      });
      
      setNotifications(savedNotifications);
    };

    loadInitialData();

    // Configurar evento para cerrar notificaciones al hacer clic fuera
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Obtener conteo de noticias de la API
  useEffect(() => {
    const fetchNewsCount = async () => {
      try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/count');
        setNewsCount(response.data);
      } catch (error) {
        console.error("Error fetching news count:", error);
        setNewsCount(120); // Valor por defecto si falla la API
      }
    };

    fetchNewsCount();
  }, []);

  const handleNewComment = (postId, postTitle) => {
    setForumStats(prev => ({
      ...prev,
      totalComments: prev.totalComments + 1
    }));

    // Agregar notificación si el comentario es en una publicación del usuario
    const posts = JSON.parse(localStorage.getItem("forumPosts") || "[]");
    const commentedPost = posts.find(p => p.id === postId);
    
    if (commentedPost) {
      const newNotification = {
        id: Date.now(),
        type: 'comment',
        postId,
        postTitle,
        author: 'Usuario', // En una implementación real, usarías el autor real
        message: `Nuevo comentario en tu publicación "${postTitle.slice(0, 30)}${postTitle.length > 30 ? '...' : ''}"`,
        timestamp: new Date().toISOString(),
        read: false
      };

      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      localStorage.setItem("forumNotifications", JSON.stringify(updatedNotifications));
      
      setForumStats(prev => ({
        ...prev,
        unreadNotifications: prev.unreadNotifications + 1
      }));
    }
  };

  const handleNewPost = () => {
    setForumStats(prev => ({
      ...prev,
      totalPosts: prev.totalPosts + 1
    }));
  };

  const handleNewGroup = () => {
    setForumStats(prev => ({
      ...prev,
      totalGroups: prev.totalGroups + 1
    }));
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setActiveTab('group-discussions');
  };

  const markNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem("forumNotifications", JSON.stringify(updatedNotifications));
    
    setForumStats(prev => ({
      ...prev,
      unreadNotifications: 0
    }));
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'comment' && notification.postId) {
      // Navegar a la publicación con el comentario
      setActiveTab('comments');
      // Aquí podrías implementar lógica para resaltar el comentario específico
    }
    
    // Marcar como leída
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem("forumNotifications", JSON.stringify(updatedNotifications));
    
    setForumStats(prev => ({
      ...prev,
      unreadNotifications: updatedNotifications.filter(n => !n.read).length
    }));
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header 
        title="Comunicación Aeroespacial" 
        subtitle="Plataforma colaborativa para ingeniería y sostenibilidad espacial" 
      >
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications && forumStats.unreadNotifications > 0) {
                markNotificationsAsRead();
              }
            }}
            className="p-2 rounded-full hover:bg-gray-100 relative"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {forumStats.unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {forumStats.unreadNotifications}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-50"
              >
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">Notificaciones</h3>
                  <button 
                    onClick={markNotificationsAsRead}
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    Marcar todas como leídas
                  </button>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No hay notificaciones
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-start">
                          {notification.type === 'comment' && (
                            <MessageCircle className="h-4 w-4 mt-1 mr-2 text-indigo-500 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="h-2 w-2 bg-blue-500 rounded-full ml-2 mt-1"></span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="p-2 border-t border-gray-200 text-center">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800">
                    Ver todas las notificaciones
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Header>

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">
        {/* Estadísticas principales */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Publicaciones"
            icon={FileText}
            value={forumStats.totalPosts.toLocaleString()}
            color="#6366F1"
            description="Temas técnicos publicados"
          />
          <StatCard
            name="Interacciones"
            icon={MessageCircle}
            value={forumStats.totalComments.toLocaleString()}
            color="#10B981"
            description="Comentarios colaborativos"
          />
          <StatCard
            name="Grupos Activos"
            icon={Users}
            value={forumStats.totalGroups.toLocaleString()}
            color="#F59E0B"
            description="Equipos especializados"
          />
          <StatCard
            name="Noticias"
            icon={Globe}
            value={newsCount.toLocaleString()}
            color="#EC4899"
            description="Actualizaciones globales"
          />
        </motion.div>

        {/* Sistema de pestañas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Tab.Group selectedIndex={['posts', 'comments', 'groups', 'news'].indexOf(activeTab)} onChange={(index) => setActiveTab(['posts', 'comments', 'groups', 'news'][index])}>
            <Tab.List className="flex border-b border-gray-200">
              <Tab className={({ selected }) => 
                `px-4 py-3 text-sm font-medium flex items-center space-x-2 focus:outline-none
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                <FileText className="h-4 w-4" />
                <span>Publicaciones</span>
              </Tab>
              <Tab className={({ selected }) => 
                `px-4 py-3 text-sm font-medium flex items-center space-x-2 focus:outline-none
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                <MessageCircle className="h-4 w-4" />
                <span>Discusiones</span>
              </Tab>
              <Tab className={({ selected }) => 
                `px-4 py-3 text-sm font-medium flex items-center space-x-2 focus:outline-none
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                <Users className="h-4 w-4" />
                <span>Grupos</span>
              </Tab>
              <Tab className={({ selected }) => 
                `px-4 py-3 text-sm font-medium flex items-center space-x-2 focus:outline-none
                ${selected ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`
              }>
                <Rocket className="h-4 w-4" />
                <span>Noticias</span>
              </Tab>
            </Tab.List>
            
            <Tab.Panels className="p-6">
              <AnimatePresence mode="wait">
                <Tab.Panel>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PostSection 
                      onNewPost={handleNewPost} 
                      onGroupSelect={handleGroupSelect}
                    />
                  </motion.div>
                </Tab.Panel>
                
                <Tab.Panel>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CommentsSection 
                      onNewComment={handleNewComment} 
                      selectedGroup={selectedGroup}
                    />
                  </motion.div>
                </Tab.Panel>
                
                <Tab.Panel>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GroupsSection 
                      onNewGroup={handleNewGroup} 
                      onGroupSelect={handleGroupSelect}
                    />
                  </motion.div>
                </Tab.Panel>
                
                <Tab.Panel>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NewsSection />
                  </motion.div>
                </Tab.Panel>
              </AnimatePresence>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </div>
  );
};

export default ForumPage;