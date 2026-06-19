import { useGame } from './context/GameContext';
import Header from './components/Header';
import HomeMap from './components/HomeMap';
import LessonEngine from './components/LessonEngine';
import AuthView from './components/AuthView';
import ChallengeList from './components/ChallengeList';

function GameRunner() {
  const { currentView, loading, user, authLoading } = useGame();

  if (authLoading || loading) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-panel animate-pop" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="animate-float" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎈</div>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Đang tải dữ liệu...</h2>
          <p style={{ color: 'var(--color-text-light)' }}>Chào mừng con đến với FinanceKids!</p>
        </div>
      </div>
    );
  }

  // If not authenticated, force AuthView
  if (!user) {
    return (
      <div className="app-container" style={{ justifyContent: 'center' }}>
        <AuthView />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <main style={{ flex: 1, padding: '1rem 0' }}>
        {currentView === 'menu' && <HomeMap />}
        {currentView === 'lesson' && <LessonEngine />}
        {currentView === 'challenges' && <ChallengeList />}
      </main>
    </div>
  );
}

export default GameRunner;
