import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { challengeQuestions } from '../data/challengeQuestions';
import { Check, Lock, Award, Sparkles, X, Trophy, Coins } from 'lucide-react';
import AnimatedMascot from './AnimatedMascot';

export default function ChallengeList() {
  const { answeredQuestions, answerChallengeQuestion, navigateTo } = useGame();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
  const [nextTimer, setNextTimer] = useState(null);

  const totalQuestions = challengeQuestions.length;
  const completedCount = answeredQuestions.length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);
  const isCourseCompleted = completedCount === totalQuestions;

  const handleOpenQuestion = (q) => {
    if (answeredQuestions.includes(q.id)) return;
    setSelectedQuestion(q);
    setFeedback(null);
  };

  const handleGoToNext = (currentId) => {
    setFeedback(null);
    const nextQIndex = challengeQuestions.findIndex(q => q.id === currentId) + 1;
    if (nextQIndex < challengeQuestions.length) {
      // Find the next unanswered question sequentially
      let nextQ = challengeQuestions[nextQIndex];
      setSelectedQuestion(nextQ);
    } else {
      setSelectedQuestion(null);
    }
  };

  const handleCloseModal = () => {
    if (nextTimer) clearTimeout(nextTimer);
    setSelectedQuestion(null);
    setFeedback(null);
  };

  const handleAnswerClick = (option) => {
    if (!selectedQuestion) return;

    if (option.isCorrect) {
      answerChallengeQuestion(selectedQuestion.id, true, selectedQuestion.reward);
      setFeedback({
        type: 'success',
        message: `Tuyệt vời! Con được nhận +10 Điểm và +${selectedQuestion.reward} Xu! 🎉`
      });
      
      // Auto-advance after 3.5 seconds
      const timer = setTimeout(() => {
        handleGoToNext(selectedQuestion.id);
      }, 3500);
      setNextTimer(timer);
    } else {
      setFeedback({
        type: 'error',
        message: 'Chưa chính xác rồi con ơi, hãy suy nghĩ thêm và thử lại nhé!'
      });
    }
  };

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Header section with back button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--color-text-main)', margin: 0 }}>Thử Thách 30 Câu Hỏi</h2>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }} onClick={() => navigateTo('menu')}>
          Quay lại bản đồ
        </button>
      </div>

      {/* Progress Card */}
      <div className="glass-panel animate-pop" style={{ marginBottom: '1.5rem', padding: '1.2rem', backgroundColor: '#FFFFFF', border: '1px solid rgba(14, 30, 56, 0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-text-light)' }}>TIẾN TRÌNH THỬ THÁCH</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-secondary)' }}>
              {completedCount} / {totalQuestions} câu đã làm
            </div>
          </div>
          {isCourseCompleted ? (
            <div className="animate-float" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #FF9F43 0%, #FF7A00 100%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 122, 0, 0.3)',
              }}>
                <Award size={20} color="white" />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#FF7A00' }}>HIỆP SĨ VÀNG</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-light)', fontWeight: '800', fontSize: '0.85rem' }}>
              <Lock size={16} /> Nhận Huy hiệu vàng
            </div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div style={{ width: '100%', height: '12px', backgroundColor: '#F3F4F6', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FF9F43 0%, #FF7A00 100%)',
            borderRadius: '6px',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
      </div>

      {/* Completion Banner */}
      {isCourseCompleted && (
        <div className="glass-panel animate-pop" style={{
          border: '1px solid rgba(255, 122, 0, 0.3)',
          background: 'linear-gradient(135deg, #FFF9F2 0%, #FFFDFB 100%)',
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Mascot in congrats banner */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <AnimatedMascot animation="joy" size={120} />
          </div>
          <h1 style={{ color: '#E06C00', fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '900' }}>
            <Sparkles size={20} style={{ display: 'inline', marginRight: '0.5rem' }} /> CHÚC MỪNG CON!
          </h1>
          <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
            Con đã xuất sắc trả lời đúng tất cả 30 câu hỏi thử thách tài chính và chính thức mở khóa danh hiệu:
          </p>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            padding: '1.2rem 2.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-soft)',
            border: '2px dashed #FF9F43'
          }}>
            <Award size={40} color="#FF7A00" className="animate-float" />
            <h3 style={{ color: '#D47E00', marginTop: '0.3rem', fontSize: '1.2rem', fontWeight: '900' }}>Hiệp Sĩ Tài Chính Nhí</h3>
          </div>
        </div>
      )}

      {/* 30 Questions Grid */}
      <h3 style={{ marginBottom: '1rem', color: 'var(--color-secondary)', fontSize: '1.2rem', fontWeight: '800' }}>Bản đồ thử thách</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.6rem'
      }}>
        {challengeQuestions.map((q) => {
          const isDone = answeredQuestions.includes(q.id);
          return (
            <div
              key={q.id}
              onClick={() => handleOpenQuestion(q)}
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isDone ? 'var(--color-primary)' : '#FFFFFF',
                color: isDone ? '#FFFFFF' : 'var(--color-secondary)',
                border: isDone ? 'none' : '1px solid rgba(14, 30, 56, 0.08)',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: isDone ? 'default' : 'pointer',
                fontWeight: '900',
                fontSize: '1.2rem',
                transition: 'all 0.25s',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!isDone) {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 122, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDone) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(14, 30, 56, 0.08)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                }
              }}
            >
              {isDone ? <Check size={20} strokeWidth={4} /> : q.id}
            </div>
          );
        })}
      </div>

      {/* Quiz Modal */}
      {selectedQuestion && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-panel animate-pop" style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: 'white',
            border: '3px solid var(--color-secondary)',
            padding: '2.5rem 1.5rem',
            position: 'relative'
          }}>
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-light)'
              }}
            >
              <X size={24} />
            </button>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="score-badge" style={{ backgroundColor: 'var(--color-accent)' }}>
                <Trophy size={16} color="#FF9F43" /> Thử thách {selectedQuestion.id}
              </div>
              <div className="wallet-badge" style={{ backgroundColor: 'var(--color-success)' }}>
                <Coins size={16} color="#FFF" /> Nhận {selectedQuestion.reward} xu
              </div>
            </div>

            {/* Question Illustration */}
            <div className="animate-float" style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              lineHeight: '1'
            }}>
              {selectedQuestion.image ? (
                <img 
                  src={selectedQuestion.image} 
                  alt="Illustration" 
                  style={{
                    width: '100%',
                    maxHeight: '180px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid #F0F0F0',
                    boxShadow: 'var(--shadow-soft)'
                  }} 
                />
              ) : (
                <span style={{ fontSize: '4.5rem' }}>❓</span>
              )}
            </div>

            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.4rem', color: 'var(--color-text-main)' }}>
              {selectedQuestion.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  className="game-card"
                  style={{
                    width: '100%',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    borderColor: '#E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.1rem 1.2rem'
                  }}
                  onClick={() => handleAnswerClick(opt)}
                  disabled={feedback && feedback.type === 'success'}
                >
                  <span style={{
                    background: 'var(--color-secondary)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '900',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>{i + 1}</span>
                  <span style={{ flex: 1 }}>{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Celebratory Animation Overlay */}
            {feedback && feedback.type === 'success' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textAlign: 'center',
                animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
                  <AnimatedMascot animation="joy" size={110} />
                </div>
                <h1 style={{ color: 'var(--color-success)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>ĐÚNG RỒI!</h1>
                <p style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--color-text-main)', marginBottom: '2rem' }}>
                  {feedback.message}
                </p>
                <div style={{ display: 'flex', gap: '0.8rem', width: '100%', justifyContent: 'center' }}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }} 
                    onClick={handleCloseModal}
                  >
                    Dừng & Về Menu
                  </button>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }} 
                    onClick={() => handleGoToNext(selectedQuestion.id)}
                  >
                    Câu tiếp theo
                  </button>
                </div>
              </div>
            )}

            {feedback && feedback.type === 'error' && (
              <div className="animate-pop" style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--color-primary)',
                backgroundColor: '#FFECEC',
                color: 'var(--color-primary)',
                fontWeight: '800',
                textAlign: 'center'
              }}>
                {feedback.message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
