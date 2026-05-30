import React, { useContext } from 'react';
import { BookOpen, User, LogOut, Newspaper, Map, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar({ currentView, setView }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div onClick={() => setView('news')} className="navbar-brand">
          <BookOpen size={28} />
          <span>EduHub</span>
        </div>

        {/* Навігація */}
        <div className="navbar-links">
          <button 
            onClick={() => setView('news')} 
            className={`nav-link ${currentView === 'news' ? 'nav-link-active' : ''}`}
          >
            <Newspaper size={16} />
            <span>Новини</span>
          </button>
          
          <button 
            onClick={() => setView('catalog')} 
            className={`nav-link ${currentView === 'catalog' || currentView === 'courseDetail' ? 'nav-link-active' : ''}`}
          >
            <Search size={16} />
            <span>Каталог</span>
          </button>

          <button 
            onClick={() => setView('programs')} 
            className={`nav-link ${currentView === 'programs' ? 'nav-link-active' : ''}`}
          >
            <Map size={16} />
            <span>Програми</span>
          </button>

          {user ? (
            <>
              <button 
                onClick={() => setView('dashboard')} 
                className={`nav-link ${currentView === 'dashboard' ? 'nav-link-active' : ''}`}
              >
                <User size={16} />
                <span>Кабінет</span>
              </button>

              <div className="nav-user-badge">
                <span className="nav-username">{user.username}</span>
                <button onClick={logout} className="btn-logout" title="Вийти">
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => setView('auth')} className="btn-secondary" style={{ padding: '0.375rem 1rem' }}>
              Увійти
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}