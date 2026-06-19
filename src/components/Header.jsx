import { useGame } from '../context/GameContext';
import { Coins, Trophy, Home, LogOut, Award } from 'lucide-react';

export default function Header() {
  const { score, wallet, currentView, navigateTo, user, logOut, answeredQuestions } = useGame();

  const isCourseCompleted = answeredQuestions?.length === 30;

  return (
    <header className="header animate-slide" style={{ flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
      {/* Top Row: Brand/Nav and User Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {currentView !== 'menu' ? (
          <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }} onClick={() => navigateTo('menu')}>
            <Home size={18} /> Menu
          </button>
        ) : (
          <div style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--color-primary)' }}>FinanceKids</div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontWeight: '800', color: 'var(--color-text-main)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Hi, {user?.displayName || 'Hiệp sĩ'}
            {isCourseCompleted && (
              <span className="animate-float" title="Huy hiệu Hiệp sĩ Vàng">
                <Award size={20} color="#FF9F43" style={{ fill: '#FFE66D' }} />
              </span>
            )}
          </span>
          <button 
            onClick={logOut} 
            style={{ 
              background: '#FFECEC', 
              border: 'none', 
              color: 'var(--color-primary)', 
              padding: '0.4rem', 
              borderRadius: '50%', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-soft)'
            }}
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Row: Score & Coins Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <div className="score-badge animate-pop" style={{ flex: 1, justifyContent: 'center' }}>
          <Trophy size={18} color="#FF9F43" /> {score} Điểm
        </div>
        <div className="wallet-badge animate-pop" style={{ flex: 1, justifyContent: 'center' }}>
          <Coins size={18} color="#FFD93B" /> {wallet} Xu
        </div>
      </div>
    </header>
  );
}
