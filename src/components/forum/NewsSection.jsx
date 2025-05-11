import React, { useState, useEffect } from "react";
import { Globe, TrendingUp, Satellite, Clock, ExternalLink } from "lucide-react";
import axios from 'axios';

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-indigo-600" />
          Últimas Noticias Aeroespaciales
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Fuente: Spaceflight News API</span>
          <button className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            En tiempo real
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      ) : loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-4 bg-gray-100 rounded-lg">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mt-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <article 
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-indigo-700 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.summary || "No hay resumen disponible."}
                  </p>
                </div>
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="ml-4 w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(item.published_at)}
                  </span>
                  {item.news_site && (
                    <span className="text-xs text-gray-500">{item.news_site}</span>
                  )}
                </div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  Ver noticia completa <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </article>
          ))}
          
          <div className="text-center pt-4">
            <a 
              href="https://spaceflightnewsapi.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
            >
              Ver más noticias en Spaceflight News <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;