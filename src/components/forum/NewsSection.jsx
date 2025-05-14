import React, { useState, useEffect } from "react";
import { Globe, TrendingUp, Satellite, Clock, ExternalLink } from "lucide-react";
import axios from 'axios';
import { motion } from "framer-motion";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // API de Spaceflight News (gratis y sin API key requerida)
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles', {
          params: {
            limit: 5,
            ordering: '-published_at'
          }
        });
        
        setNews(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Error al cargar las noticias. Intente nuevamente más tarde.");
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Globe className="h-5 w-5 mr-2 text-indigo-400" />
          Últimas Noticias Aeroespaciales
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Fuente: Spaceflight News API</span>
          <button className="text-xs bg-indigo-900 text-indigo-300 px-2 py-1 rounded-full flex items-center">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            En tiempo real
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      ) : loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-3 bg-gray-700 rounded-lg">
              <div className="h-4 bg-gray-600 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-600 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-full"></div>
              <div className="h-3 bg-gray-600 rounded w-2/3 mt-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-indigo-300 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {item.summary || "No hay resumen disponible."}
                  </p>
                </div>
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="ml-3 w-14 h-14 object-cover rounded"
                  />
                )}
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(item.published_at)}
                  </span>
                  {item.news_site && (
                    <span className="text-xs text-gray-400">{item.news_site}</span>
                  )}
                </div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                >
                  Ver noticia <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </motion.article>
          ))}
          
          <div className="text-center pt-3">
            <a 
              href="https://spaceflightnewsapi.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center"
            >
              Ver más noticias <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;