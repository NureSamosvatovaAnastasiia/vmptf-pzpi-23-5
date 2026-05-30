import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookOpen } from 'lucide-react';
import api from '../services/api';

export default function Dashboard({ onSelectCourse }) {
  const { user } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.get('/users/me/courses')
        .then(res => {
          setMyCourses(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Помилка особистих курсів', err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <p>Завантаження Вашого профілю...</p>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <div className="dashboard-header-card">
        <h1 className="dashboard-welcome-title">Особистий кабінет студента</h1>
        <p className="dashboard-welcome-subtitle">
          Привіт, <span className="text-indigo-600 font-bold">{user?.username}</span>!
        </p>
      </div>

      <div className="dashboard-courses-card">
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          <BookOpen className="text-indigo-600" size={24} />
          <span>Ваші активні курси</span>
        </h2>

        {myCourses.length > 0 ? (
          <div className="dashboard-courses-list">
            {myCourses.map(course => (
              <div key={course.id} className="my-course-item">
                <div style={{ flex: 1 }}>
                  <h3 className="my-course-title">{course.title}</h3>
                  <div className="my-course-meta">
                    <span>👤 {course.author}</span>
                    <span>📆 Початок: {new Date(course.enrolledAt).toLocaleDateString('uk-UA')}</span>
                  </div>
                  <div className="my-course-progress-track">
                    <div className="my-course-progress-bar" style={{ width: `${course.progress || 10}%` }} />
                  </div>
                </div>

                <button 
                  onClick={() => onSelectCourse(course.id)}
                  className="btn-continue"
                >
                  Продовжити
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-courses-placeholder">
            <p>Ви поки що не записані на жоден навчальний курс.</p>
            <button 
              onClick={() => onSelectCourse(null)}
              className="btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              Переглянути каталог курсів
            </button>
          </div>
        )}
      </div>
    </div>
  );
}