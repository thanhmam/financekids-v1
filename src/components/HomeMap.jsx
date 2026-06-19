import { useGame } from '../context/GameContext';
import { lessonsData } from '../data/lessons';
import { PiggyBank, ShoppingBag, Store, ArrowRight, Award } from 'lucide-react';

const icons = {
  PiggyBank: <PiggyBank size={32} color="var(--color-primary)" />,
  ShoppingBag: <ShoppingBag size={32} color="var(--color-secondary)" />,
  Store: <Store size={32} color="var(--color-accent)" />
};

export default function HomeMap() {
  const { navigateTo } = useGame();

  return (
    <div className="glass-panel animate-slide" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Bản đồ Bài học</h1>
      
      {lessonsData.map((lesson, index) => (
        <div 
          key={lesson.id} 
          className="game-card"
          onClick={() => navigateTo('lesson', lesson.id)}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', animationDelay: `${index * 0.1}s` }}
        >
          <div style={{ background: 'var(--color-background)', padding: '1rem', borderRadius: 'var(--radius-full)' }}>
            {icons[lesson.icon]}
          </div>
          <div style={{ flex: 1 }}>
            <h3>Bài {lesson.id}: {lesson.title}</h3>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{lesson.description}</p>
          </div>
          <ArrowRight size={24} color="var(--color-text-light)" />
        </div>
      ))}

      {/* 30-Question Challenge Card */}
      <div 
        className="game-card animate-pop"
        onClick={() => navigateTo('challenges')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem',
          border: '3px solid #FFD93B',
          background: 'linear-gradient(135deg, #FFFDF0 0%, #FFFDF5 100%)',
          boxShadow: '0 8px 25px rgba(255, 217, 59, 0.25)'
        }}
      >
        <div style={{ background: '#FFF7D6', padding: '1rem', borderRadius: 'var(--radius-full)' }}>
          <Award size={32} color="#FF9F43" />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#D47E00' }}>🏆 Thử thách 30 Câu hỏi Tài chính</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Trả lời tất cả câu hỏi trắc nghiệm để giành Huy hiệu Hiệp sĩ Vàng!</p>
        </div>
        <ArrowRight size={24} color="#FF9F43" />
      </div>
    </div>
  );
}
