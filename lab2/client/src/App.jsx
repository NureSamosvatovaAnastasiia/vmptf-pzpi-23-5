import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NewsView from './components/NewsView';
import CatalogView from './components/CatalogView';
import CourseDetail from './components/CourseDetail';
import ProgramsView from './components/ProgramsView';
import Dashboard from './components/Dashboard';
import AuthView from './components/AuthView';
import { AuthProvider } from './context/AuthContext';
import './App.css';

export default function App() {
  const [view, setView] = useState('news');
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleSelectCourse = (courseId) => {
    if (courseId === null) {
      setView('catalog');
    } else {
      setSelectedCourseId(courseId);
      setView('courseDetail');
    }
  };

  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar currentView={view} setView={setView} />
        
        <main className="main-content">
          {view === 'news' && <NewsView />}
          
          {view === 'catalog' && (
            <CatalogView onSelectCourse={handleSelectCourse} />
          )}
          
          {view === 'courseDetail' && (
            <CourseDetail 
              courseId={selectedCourseId} 
              onBack={() => setView('catalog')} 
            />
          )}
          
          {view === 'programs' && (
            <ProgramsView onSelectCourse={handleSelectCourse} />
          )}
          
          {view === 'dashboard' && (
            <Dashboard onSelectCourse={handleSelectCourse} />
          )}
          
          {view === 'auth' && (
            <AuthView onAuthSuccess={() => setView('catalog')} />
          )}
        </main>
      </div>
    </AuthProvider>
  );
}