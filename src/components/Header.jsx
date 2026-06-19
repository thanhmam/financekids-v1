import { useGame } from '../context/GameContext';
import { Coins, Trophy, Home, LogOut, Award } from 'lucide-react';

export default function Header() {
  const { score, wallet, currentView, navigateTo, user, logOut, answeredQuestions } = useGame();

  const isCourseCompleted = answeredQuestions?.length === 30;

  return (
    <header className="header animate-slide" style={{ flexDirection: 'column', gap: '0.8rem', alignItems: 'stretch', marginBottom: '1.2rem' }}>
      {/* Top Row: User info and log out button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {currentView !== 'menu' ? (
          <button 
            className="btn btn-secondary" 
            style={{ 
              padding: '0.4rem 0.8rem', 
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-md)'
            }} 
            onClick={() => navigateTo('menu')}
          >
            <Home size={16} /> Quay lại
          </button>
        ) : (
          <div style={{ fontWeight: '900', fontSize: '1.5rem', color: 'var(--color-secondary)' }}>FinanceKids</div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontWeight: '800', color: 'var(--color-text-main)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Chào, {user?.displayName || 'Hiệp sĩ'}
            {isCourseCompleted && (
              <span className="animate-float" title="Huy hiệu Hiệp sĩ Vàng">
                <Award size={18} color="#FF7A00" style={{ fill: '#FFE66D' }} />
              </span>
            )}
          </span>
          <button 
            onClick={logOut} 
            style={{ 
              background: '#F3F4F6', 
              border: 'none', 
              color: 'var(--color-text-light)', 
              padding: '0.45rem', 
              borderRadius: '50%', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            title="Đăng xuất"
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFECEC'; e.currentTarget.style.color = 'red'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.color = 'var(--color-text-light)'; }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Row: Minimalist Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem' }}>
        <div className="score-badge animate-pop" style={{ flex: 1, justifyContent: 'center', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          <Trophy size={16} color="#FF7A00" style={{ fill: '#FFF1E0' }} /> <span>{score} Điểm</span>
        </div>
        <div className="wallet-badge animate-pop" style={{ flex: 1, justifyContent: 'center', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          <Coins size={16} color="#FFB800" style={{ fill: '#FFFCE6' }} /> <span>{wallet} Xu</span>
        </div>
      </div>
    </header>
  );
}
