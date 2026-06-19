import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [wallet, setWallet] = useState(10); // Start with 10 coins
  const [currentView, setCurrentView] = useState('menu'); // menu, lesson, quiz, transaction
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize or fetch user ID
  useEffect(() => {
    let id = localStorage.getItem('financekids_user_id');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('financekids_user_id', id);
    }
    setUserId(id);
  }, []);

  // Load score and wallet from Firestore
  useEffect(() => {
    if (!userId) return;
    const userDocRef = doc(db, 'users', userId);
    getDoc(userDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.score !== undefined) setScore(data.score);
          if (data.wallet !== undefined) setWallet(data.wallet);
        } else {
          // Initialize user doc in Firestore
          setDoc(userDocRef, { score: 0, wallet: 10 }).catch(console.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user data from Firestore:", err);
        setLoading(false);
      });
  }, [userId]);

  // Helper functions
  const addScore = (points) => {
    const newScore = score + points;
    setScore(newScore);
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      updateDoc(userDocRef, { score: newScore }).catch(console.error);
    }
  };

  const addCoins = (amount) => {
    const newWallet = wallet + amount;
    setWallet(newWallet);
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      updateDoc(userDocRef, { wallet: newWallet }).catch(console.error);
    }
  };

  const spendCoins = (amount) => {
    if (wallet >= amount) {
      const newWallet = wallet - amount;
      setWallet(newWallet);
      if (userId) {
        const userDocRef = doc(db, 'users', userId);
        updateDoc(userDocRef, { wallet: newWallet }).catch(console.error);
      }
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
    loading,
    userId,
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
