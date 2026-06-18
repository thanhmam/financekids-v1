import { useGame } from './context/GameContext';
import Header from './components/Header';
import HomeMap from './components/HomeMap';
import LessonEngine from './components/LessonEngine';

function GameRunner() {
  const { currentView } = useGame();

  return (
    <div className="app-container">
      <Header />
      <main style={{ flex: 1 }}>
        {currentView === 'menu' && <HomeMap />}
        {currentView === 'lesson' && <LessonEngine />}
      </main>
    </div>
  );
}

export default GameRunner;
