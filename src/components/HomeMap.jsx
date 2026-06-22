import { useGame } from '../context/GameContext';
import { lessonsData } from '../data/lessons';
import { PiggyBank, ShoppingBag, Store, ArrowRight, Award } from 'lucide-react';
import AnimatedMascot from './AnimatedMascot';

const icons = {
  PiggyBank: <PiggyBank size={24} color="#FF7A00" />,
  ShoppingBag: <ShoppingBag size={24} color="#2EC4B6" />,
  Store: <Store size={24} color="#0E1E38" />
};

export default function HomeMap() {
  const { navigateTo } = useGame();

  return (
    <div className="glass-panel animate-slide" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', backgroundColor: '#FFFFFF' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.8rem', color: 'var(--color-secondary)' }}>Bản đồ Bài học</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', margin: '0.2rem 0' }}>
        <AnimatedMascot animation="wave" size={120} />
      </div>
      
      {lessonsData.map((lesson, index) => (
        <div 
          key={lesson.id} 
          className="game-card"
          onClick={() => navigateTo('lesson', lesson.id)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.2rem', 
            animationDelay: `${index * 0.08}s`,
            padding: '1.2rem'
          }}
        >
          <div style={{ backgroundColor: '#F3F4F6', padding: '0.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icons[lesson.icon]}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Bài {lesson.id}: {lesson.title}</h3>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.15rem' }}>{lesson.description}</p>
          </div>
          <ArrowRight size={20} color="var(--color-text-light)" />
        </div>
      ))}

      {/* 30-Question Challenge Card */}
      <div 
        className="game-card animate-pop"
        onClick={() => navigateTo('challenges')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.2rem',
          border: '1px solid rgba(255, 122, 0, 0.25)',
          background: 'linear-gradient(135deg, #FFF9F2 0%, #FFFDFB 100%)',
          boxShadow: 'var(--shadow-card)',
          padding: '1.2rem'
        }}
      >
        <div style={{ backgroundColor: '#FFEBD6', padding: '0.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Award size={24} color="#FF7A00" />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#E06C00', fontSize: '1.1rem', fontWeight: '800' }}>🏆 Thử thách 30 Câu hỏi</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.15rem' }}>Đồng hành cùng Cáo Cam chinh phục danh hiệu Hiệp sĩ Vàng!</p>
        </div>
        <ArrowRight size={20} color="#FF7A00" />
      </div>
    </div>
  );
}
