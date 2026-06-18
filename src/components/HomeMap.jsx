import { useGame } from '../context/GameContext';
import { lessonsData } from '../data/lessons';
import { PiggyBank, ShoppingBag, Store, ArrowRight } from 'lucide-react';

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
    </div>
  );
}
