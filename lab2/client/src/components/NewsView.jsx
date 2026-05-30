import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import api from '../services/api';

export default function NewsView() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news')
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Помилка новин', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <p>Завантаження стрічки новин...</p>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <h1 className="section-title">
        <Newspaper className="text-indigo-600" size={32} />
        Новини та оголошення
      </h1>

      <div className="space-y-6">
        {news.map(item => (
          <div key={item.id} className="news-card">
            <div className="news-header">
              <h2 className="news-card-title">{item.title}</h2>
              <span className="news-date">
                {new Date(item.publishedAt).toLocaleDateString('uk-UA')}
              </span>
            </div>
            <p className="news-content">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}