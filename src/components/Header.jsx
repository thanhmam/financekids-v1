import { useGame } from '../context/GameContext';
import { Coins, Trophy, Home } from 'lucide-react';

export default function Header() {
  const { score, wallet, currentView, navigateTo } = useGame();

  return (
    <header className="header animate-slide">
      {currentView !== 'menu' ? (
        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => navigateTo('menu')}>
          <Home size={20} /> Menu
        </button>
      ) : (
        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--color-primary)' }}>FinanceKids</div>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="score-badge animate-pop">
          <Trophy size={20} color="#FF9F43" /> {score} Điểm
        </div>
        <div className="wallet-badge animate-pop">
          <Coins size={20} color="#FFD93B" /> {wallet} Xu
        </div>
      </div>
    </header>
  );
}
