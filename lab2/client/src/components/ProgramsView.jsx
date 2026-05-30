import React, { useState, useEffect } from 'react';
import { Map, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function ProgramsView({ onSelectCourse }) {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, coursesRes] = await Promise.all([
          api.get('/programs'),
          api.get('/courses')
        ]);

        setPrograms(programsRes.data);
        
        const coursesMap = {};
        coursesRes.data.forEach(c => {
          coursesMap[c.id] = c;
        });
        setCourses(coursesMap);
      } catch (err) {
        console.error('Помилка завантаження програм', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container-center" style={{ textAlign: 'center' }}>
        <p>Оновлення навчальних програм...</p>
      </div>
    );
  }

  return (
    <div className="container-center">
      <h1 className="section-title">
        <Map className="text-indigo-600" size={32} />
        Навчальні програми
      </h1>

      <div className="program-grid">
        {programs.map(program => (
          <div key={program.id} className="program-card">
            <div className="program-decor-circle" />
            
            <div className="program-header-box">
              <h2 className="program-card-title">{program.title}</h2>
              <p className="program-card-desc">{program.description}</p>
            </div>
            
            <h3 className="program-steps-title">Кроки по програмі:</h3>
            <div className="program-steps-list">
              {program.courses.map((courseId, idx) => {
                const course = courses[courseId];
                if (!course) return null;
                return (
                  <div key={courseId} className="program-step-item">
                    <div className="program-step-badge">{idx + 1}</div>
                    <div className="program-step-info">
                      <h4 className="program-step-name">{course.title}</h4>
                      <p className="program-step-author">Автор: {course.author}</p>
                    </div>
                    <button 
                      onClick={() => onSelectCourse(courseId)}
                      className="program-step-link"
                    >
                      <span>Переглянути</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}