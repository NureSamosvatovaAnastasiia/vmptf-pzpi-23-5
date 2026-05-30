import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Lock, ArrowRight } from 'lucide-react';

export default function AuthView({ onAuthSuccess }) {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      onAuthSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Сталася помилка автентифікації");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-outer">
      <div className="auth-card">
        <div className="auth-badge-icon">
          <User size={32} />
        </div>

        <h2 className="auth-title">
          {isLogin ? 'Вхід на платформу' : 'Реєстрація'}
        </h2>
        <p className="auth-subtitle">
          {isLogin ? 'Введіть дані для доступу' : 'Створіть аккаунт для навчання'}
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-field-wrapper">
            <User className="input-icon-left" size={18} />
            <input 
              type="text" 
              placeholder="Ім'я користувача" 
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-field-wrapper">
            <Lock className="input-icon-left" size={18} />
            <input 
              type="password" 
              placeholder="Пароль" 
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            <span>{loading ? 'Надсилання...' : isLogin ? 'Увійти' : 'Зареєструватися'}</span>
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <button 
          onClick={() => { setIsLogin(!isLogin); setError(''); }}
          className="auth-toggle-btn"
        >
          {isLogin ? 'Немає акаунту? Створити аккаунт' : 'Вже зареєстровані? Увійти'}
        </button>
      </div>
    </div>
  );
}