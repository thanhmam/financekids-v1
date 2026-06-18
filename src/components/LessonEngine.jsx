import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { lessonsData } from '../data/lessons';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function LessonEngine() {
  const { activeLessonId, addScore, addCoins, navigateTo, wallet, spendCoins } = useGame();
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  const lesson = lessonsData.find(l => l.id === activeLessonId);
  if (!lesson) return null;

  const currentStep = lesson.content[stepIndex];
  
  const nextStep = () => {
    setFeedback(null);
    if (stepIndex < lesson.content.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      // Finished lesson
      navigateTo('menu');
    }
  };

  const handleQuizAnswer = (isCorrect, reward) => {
    if (isCorrect) {
      addScore(10);
      addCoins(reward || 5);
      setFeedback({ type: 'success', message: 'Chính xác! Con được cộng xu và điểm!' });
      setTimeout(nextStep, 2000);
    } else {
      setFeedback({ type: 'error', message: 'Chưa đúng rồi, con thử lại nhé!' });
    }
  };

  const handleTransaction = (item) => {
    if (spendCoins(item.price)) {
      setFeedback({ type: 'success', message: `Mua thành công ${item.name}! Con còn ${wallet - item.price} xu.` });
    } else {
      setFeedback({ type: 'error', message: 'Ôi, con không đủ xu để mua món này rồi!' });
    }
  };

  const renderFeedback = () => {
    if (!feedback) return null;
    return (
      <div className={`glass-panel animate-pop`} style={{ 
        marginTop: '1rem', 
        borderColor: feedback.type === 'success' ? 'var(--color-success)' : 'var(--color-primary)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: feedback.type === 'success' ? 'var(--color-success)' : 'var(--color-primary)' }}>
          {feedback.type === 'success' ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
          <h3 style={{ margin: 0 }}>{feedback.message}</h3>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep.type) {
      case 'concept':
        return (
          <div className="glass-panel animate-slide" style={{ textAlign: 'center' }}>
            <div className={currentStep.animation} style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              💡
            </div>
            <h2>{currentStep.text}</h2>
            <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={nextStep}>
              Tiếp tục
            </button>
          </div>
        );
      
      case 'quiz':
        return (
          <div className="glass-panel animate-slide">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{currentStep.question}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentStep.options.map((opt, i) => (
                <button 
                  key={i} 
                  className="game-card" 
                  style={{ width: '100%', fontSize: '1.2rem', fontWeight: 'bold' }}
                  onClick={() => handleQuizAnswer(opt.isCorrect, currentStep.reward)}
                  disabled={!!feedback && feedback.type === 'success'}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {renderFeedback()}
          </div>
        );

      case 'ab-choice':
        return (
          <div className="glass-panel animate-slide">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{currentStep.question}</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div 
                className="game-card" 
                style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => handleQuizAnswer(currentStep.optionA.isCorrect, currentStep.reward)}
              >
                <div style={{ fontSize: '5rem', animation: 'float 3s infinite' }}>{currentStep.optionA.image}</div>
                <h3>{currentStep.optionA.text}</h3>
              </div>
              <div 
                className="game-card" 
                style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => handleQuizAnswer(currentStep.optionB.isCorrect, currentStep.reward)}
              >
                <div style={{ fontSize: '5rem', animation: 'float 3s infinite' }}>{currentStep.optionB.image}</div>
                <h3>{currentStep.optionB.text}</h3>
              </div>
            </div>
            {renderFeedback()}
          </div>
        );

      case 'transaction':
        return (
          <div className="glass-panel animate-slide">
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Cửa hàng Mini</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '2rem' }}>Nhấp vào món đồ con muốn mua. (Xu của con: {wallet})</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
              {currentStep.items.map((item, i) => (
                <div 
                  key={i} 
                  className="game-card" 
                  style={{ textAlign: 'center', padding: '1rem' }}
                  onClick={() => handleTransaction(item)}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <h4>{item.name}</h4>
                  <div style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{item.price} Xu</div>
                </div>
              ))}
            </div>
            {renderFeedback()}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={nextStep}>
                Hoàn thành
              </button>
            </div>
          </div>
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        {lesson.content.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: '12px', height: '12px', borderRadius: '50%', 
              backgroundColor: i === stepIndex ? 'var(--color-primary)' : (i < stepIndex ? 'var(--color-success)' : '#ddd'),
              transition: 'all 0.3s'
            }} 
          />
        ))}
      </div>
      {renderStepContent()}
    </div>
  );
}
