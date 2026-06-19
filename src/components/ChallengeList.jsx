import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { challengeQuestions } from '../data/challengeQuestions';
import { Check, Lock, Award, Sparkles, X, Trophy, Coins } from 'lucide-react';

export default function ChallengeList() {
  const { answeredQuestions, answerChallengeQuestion, navigateTo } = useGame();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  const totalQuestions = challengeQuestions.length;
  const completedCount = answeredQuestions.length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);
  const isCourseCompleted = completedCount === totalQuestions;

  const handleOpenQuestion = (q) => {
    // If already answered, we can just show it or do nothing
    if (answeredQuestions.includes(q.id)) return;
    setSelectedQuestion(q);
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
      // Close modal after a delay
      setTimeout(() => {
        setSelectedQuestion(null);
        setFeedback(null);
      }, 2000);
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
      <div className="glass-panel animate-pop" style={{ marginBottom: '2rem', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-text-light)' }}>TIẾN TRÌNH KHÓA HỌC</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-primary)' }}>
              {completedCount} / {totalQuestions} Câu hỏi
            </div>
          </div>
          {isCourseCompleted ? (
            <div className="animate-float" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #FFD93B 0%, #FF9F43 100%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(255, 159, 67, 0.4)',
                border: '3px solid white'
              }}>
                <Award size={36} color="white" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#FF9F43', marginTop: '0.3rem' }}>HIỆP SĨ VÀNG</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)', fontWeight: '700' }}>
              <Lock size={20} /> Hoàn thành để mở khóa Huy hiệu
            </div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div style={{ width: '100%', height: '20px', backgroundColor: '#EBEBEB', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-secondary) 0%, var(--color-success) 100%)',
            borderRadius: '10px',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
      </div>

      {/* Completion Banner */}
      {isCourseCompleted && (
        <div className="glass-panel animate-pop" style={{
          background: 'linear-gradient(135deg, #FFE66D 0%, #FFF5D1 100%)',
          border: '3px solid #FFD93B',
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          marginBottom: '2rem'
        }}>
          <div className="animate-float" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            👑👑👑
          </div>
          <h1 style={{ color: '#E58A00', fontSize: '2.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Sparkles color="#FF9F43" /> CHÚC MỪNG CON! <Sparkles color="#FF9F43" />
          </h1>
          <p style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
            Con đã xuất sắc trả lời đúng tất cả 30 câu hỏi thử thách tài chính và chính thức mở khóa danh hiệu:
          </p>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem 3rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card)',
            border: '3px dashed #FFD93B'
          }}>
            <Award size={80} color="#FF9F43" className="animate-float" />
            <h3 style={{ color: '#D47E00', marginTop: '0.5rem', fontSize: '1.5rem' }}>Hiệp Sĩ Tài Chính Nhí</h3>
          </div>
        </div>
      )}

      {/* 30 Questions Grid */}
      <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-main)' }}>Bản đồ thử thách</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.8rem'
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
                backgroundColor: isDone ? 'var(--color-success)' : 'white',
                color: isDone ? 'white' : 'var(--color-secondary)',
                border: isDone ? 'none' : '3px solid var(--color-secondary)',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: isDone ? 'default' : 'pointer',
                fontWeight: '900',
                fontSize: '1.3rem',
                transition: 'all 0.2s',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!isDone) {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.backgroundColor = '#F0FAF9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDone) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {isDone ? <Check size={28} strokeWidth={3} /> : q.id}
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
              onClick={() => setSelectedQuestion(null)}
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
              fontSize: '5.5rem',
              textAlign: 'center',
              marginBottom: '1rem',
              lineHeight: '1'
            }}>
              {selectedQuestion.emoji || "❓"}
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
                    padding: '1rem 1.2rem'
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
                <div style={{
                  fontSize: '6rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  gap: '0.8rem',
                  justifyContent: 'center'
                }} className="animate-float">
                  🎉 ⭐ 🪙 🎈
                </div>
                <h1 style={{ color: 'var(--color-success)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>ĐÚNG RỒI!</h1>
                <p style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--color-text-main)' }}>
                  {feedback.message}
                </p>
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
