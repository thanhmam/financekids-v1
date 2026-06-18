import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [wallet, setWallet] = useState(10); // Start with 10 coins
  const [currentView, setCurrentView] = useState('menu'); // menu, lesson, quiz, transaction
  const [activeLessonId, setActiveLessonId] = useState(null);

  // Helper functions
  const addScore = (points) => setScore((prev) => prev + points);
  const addCoins = (amount) => setWallet((prev) => prev + amount);
  const spendCoins = (amount) => {
    if (wallet >= amount) {
      setWallet((prev) => prev - amount);
      return true; // Purchase successful
    }
    return false; // Not enough coins
  };

  const navigateTo = (view, lessonId = null) => {
    setCurrentView(view);
    if (lessonId !== null) {
      setActiveLessonId(lessonId);
    }
  };

  const value = {
    score,
    wallet,
    currentView,
    activeLessonId,
    addScore,
    addCoins,
    spendCoins,
    navigateTo,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
