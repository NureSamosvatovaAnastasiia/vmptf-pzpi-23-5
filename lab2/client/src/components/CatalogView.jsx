import React, { useState, useEffect } from 'react';
import { Search, Star, PlayCircle } from 'lucide-react';
import api from '../services/api';

export default function CatalogView({ onSelectCourse }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Помилка завантаження курсів', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container-center" style={{ textAlign: 'center' }}>
        <p>Завантаження каталогів...</p>
      </div>
    );
  }

  return (
    <div className="container-center">
      <h1 className="section-title">
        <Search className="text-indigo-600" size={32} />
        Каталог навчальних курсів
      </h1>

      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-banner">
              <PlayCircle size={48} className="opacity-80" />
              <div className="course-price-tag">{course.price}</div>
            </div>

            <div className="course-card-body">
              <h2 className="course-card-title">{course.title}</h2>
              <p className="course-card-desc">{course.description}</p>

              <div className="course-meta">
                <span>{course.author}</span>
                <span className="course-rating">
                  <Star size={14} className="mr-1 fill-current" />
                  {course.rating > 0 ? `${course.rating} / 5` : 'Немає оцінок'}
                </span>
              </div>

              <button 
                onClick={() => onSelectCourse(course.id)}
                className="btn-secondary"
              >
                Детальніше про курс
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}