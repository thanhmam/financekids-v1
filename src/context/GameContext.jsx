import { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [wallet, setWallet] = useState(10); // Start with 10 coins
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // List of answered challenge question IDs
  const [currentView, setCurrentView] = useState('menu'); // menu, lesson, quiz, transaction, challenges
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        // Load data from Firestore for this user
        const userDocRef = doc(db, 'users', currentUser.uid);
        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setScore(data.score ?? 0);
              setWallet(data.wallet ?? 10);
              setAnsweredQuestions(data.answeredQuestions ?? []);
            } else {
              // Initialize user doc in Firestore
              setDoc(userDocRef, {
                score: 0,
                wallet: 10,
                answeredQuestions: [],
                displayName: currentUser.displayName || 'Người chơi'
              }).catch(console.error);
              setScore(0);
              setWallet(10);
              setAnsweredQuestions([]);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error loading user data from Firestore:", err);
            setLoading(false);
          });
      } else {
        // Clear states when user signs out
        setScore(0);
        setWallet(10);
        setAnsweredQuestions([]);
        setCurrentView('menu');
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // Authentication Helpers
  const signUp = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      // Create user doc in Firestore
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        score: 0,
        wallet: 10,
        answeredQuestions: [],
        displayName: displayName
      });
      return { success: true };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message };
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      return { success: false, error: error.message };
    }
  };

  // Helper functions
  const addScore = (points) => {
    if (!user) return;
    const newScore = score + points;
    setScore(newScore);
    const userDocRef = doc(db, 'users', user.uid);
    updateDoc(userDocRef, { score: newScore }).catch(console.error);
  };

  const addCoins = (amount) => {
    if (!user) return;
    const newWallet = wallet + amount;
    setWallet(newWallet);
    const userDocRef = doc(db, 'users', user.uid);
    updateDoc(userDocRef, { wallet: newWallet }).catch(console.error);
  };

  const spendCoins = (amount) => {
    if (!user) return false;
    if (wallet >= amount) {
      const newWallet = wallet - amount;
      setWallet(newWallet);
      const userDocRef = doc(db, 'users', user.uid);
      updateDoc(userDocRef, { wallet: newWallet }).catch(console.error);
      return true; // Purchase successful
    }
    return false; // Not enough coins
  };

  // Challenge Question Action
  const answerChallengeQuestion = (questionId, isCorrect, reward) => {
    if (!user) return;
    // Don't award twice for the same question
    if (answeredQuestions.includes(questionId)) return;

    if (isCorrect) {
      const newScore = score + 10;
      const newWallet = wallet + reward;
      const newAnswered = [...answeredQuestions, questionId];

      setScore(newScore);
      setWallet(newWallet);
      setAnsweredQuestions(newAnswered);

      const userDocRef = doc(db, 'users', user.uid);
      updateDoc(userDocRef, {
        score: newScore,
        wallet: newWallet,
        answeredQuestions: newAnswered
      }).catch(console.error);
    }
  };

  const navigateTo = (view, lessonId = null) => {
    setCurrentView(view);
    if (lessonId !== null) {
      setActiveLessonId(lessonId);
    }
  };

  const value = {
    user,
    authLoading,
    score,
    wallet,
    answeredQuestions,
    currentView,
    activeLessonId,
    loading,
    signUp,
    signIn,
    logOut,
    addScore,
    addCoins,
    spendCoins,
    answerChallengeQuestion,
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
