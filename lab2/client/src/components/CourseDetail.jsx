import React, { useState, useEffect, useContext } from 'react';
import { Star, MessageSquare, CheckCircle, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function CourseDetail({ courseId, onBack }) {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, reviewsRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/courses/${courseId}/reviews`)
        ]);
        
        setCourse(courseRes.data);
        setReviews(reviewsRes.data);

        if (user) {
          const enrollRes = await api.get('/users/me/courses');
          const isEnrolled = enrollRes.data.some(c => c.id === courseId);
          setEnrolled(isEnrolled);
        }
      } catch (err) {
        console.error('Помилка деталей курсу', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Будь ласка, авторизуйтесь для запису!");
      return;
    }
    try {
      await api.post('/enroll', { courseId });
      setEnrolled(true);
    } catch (err) {
      alert("Помилка запису");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post('/reviews', {
        courseId,
        rating,
        text: reviewText
      });
      
      const newReviewObj = {
        id: res.data.id,
        rating: res.data.rating,
        text: res.data.text,
        createdAt: res.data.createdAt,
        user: user.username
      };
      
      setReviews([newReviewObj, ...reviews]);
      setReviewText('');
      setRating(5);
    } catch (err) {
      alert("Помилка відправки відгуку");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <p>Завантаження детальної інформації...</p>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={18} />
        <span>Назад до каталогу</span>
      </button>

      <div className="course-detail-card">
        <div className="hero-banner">
          <h1 className="hero-title">{course.title}</h1>
          <p className="hero-desc">{course.description}</p>
          <div className="hero-meta-row">
            <span>👨‍🏫 Викладач: <strong>{course.author}</strong></span>
            <span className="hero-badge">{course.price}</span>
          </div>
        </div>
        
        <div className="detail-action-bar">
          {enrolled ? (
            <div className="enrolled-alert">
              <CheckCircle className="text-green-500 shrink-0" size={24} />
              <div>
                <p className="enrolled-alert-title">Ви навчаєтесь на цьому курсі!</p>
                <p className="enrolled-alert-desc">Матеріали та лекції доступні у Вашому кабінеті.</p>
              </div>
            </div>
          ) : (
            <button onClick={handleEnroll} className="btn-primary">
              Записатися на курс
            </button>
          )}
        </div>
      </div>

      <div className="reviews-container">
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          <MessageSquare className="text-indigo-600" size={24} />
          Відгуки студентів
        </h2>

        {enrolled && (
          <form onSubmit={handleAddReview} className="review-form-box" style={{ marginBottom: '2rem' }}>
            <h3 className="review-form-title">Залишити відгук</h3>
            
            <div className="stars-selector">
              <span className="stars-selector-label">Оцінка:</span>
              {[1, 2, 3, 4, 5].map(num => (
                <button 
                  type="button" 
                  key={num} 
                  onClick={() => setRating(num)}
                  className="star-select-btn"
                >
                  <Star 
                    size={24} 
                    className={rating >= num ? 'star-active' : 'star-inactive'} 
                  />
                </button>
              ))}
            </div>

            <textarea 
              className="review-textarea"
              placeholder="Поділіться своїми враженнями..."
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />

            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Надсилання...' : 'Опублікувати відгук'}
            </button>
          </form>
        )}

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-author-row">
                  <span className="review-author">{review.user}</span>
                  <div className="review-rating-stars">
                    <Star size={14} className="fill-current" />
                    <span>{review.rating}/5</span>
                  </div>
                </div>
                <p className="review-text-body">{review.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Тут поки порожньо. Будьте першим!</p>
          )}
        </div>
      </div>
    </div>
  );
}