import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { KeyRound, Mail, User, Sparkles } from 'lucide-react';

export default function AuthView() {
  const { signIn, signUp } = useGame();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || (isSignUp && !displayName)) {
      setError('Vui lòng nhập đầy đủ thông tin con nhé!');
      setLoading(false);
      return;
    }

    let result;
    if (isSignUp) {
      result = await signUp(email, password, displayName);
    } else {
      result = await signIn(email, password);
    }

    if (!result.success) {
      if (result.error.includes('auth/weak-password')) {
        setError('Mật khẩu cần dài ít nhất 6 ký tự con nhé!');
      } else if (result.error.includes('auth/email-already-in-use')) {
        setError('Email này đã được đăng ký rồi con ơi!');
      } else if (result.error.includes('auth/invalid-credential') || result.error.includes('auth/user-not-found') || result.error.includes('auth/wrong-password')) {
        setError('Email hoặc mật khẩu chưa chính xác rồi, con kiểm tra lại nhé!');
      } else {
        setError('Có lỗi xảy ra: ' + result.error);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '85vh',
      padding: '1rem'
    }}>
      <div className="glass-panel animate-pop" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '2.5rem 2rem',
        border: '1px solid rgba(14, 30, 56, 0.08)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: '#FFFFFF'
      }}>
        {/* Fox Mascot Illustration */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="animate-float" style={{
            width: '140px',
            height: '140px',
            margin: '0 auto 1rem',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#FFF7ED',
            border: '4px solid #FFF',
            boxShadow: 'var(--shadow-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/mascot.png" 
              alt="Cáo Cam Mascot" 
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                marginTop: '5%'
              }}
            />
          </div>
          <h1 style={{ 
            fontSize: '2.1rem', 
            color: 'var(--color-secondary)', 
            marginBottom: '0.3rem',
            fontWeight: '900'
          }}>
            FinanceKids
          </h1>
          <p style={{ color: 'var(--color-text-light)', fontWeight: '700', fontSize: '0.95rem' }}>
            {isSignUp ? 'Đăng ký tài khoản hiệp sĩ tài chính mới' : 'Đăng nhập vào hành trình học tập'}
          </p>
        </div>

        {error && (
          <div className="animate-pop" style={{
            backgroundColor: '#FFF2F2',
            border: '1px solid #FF8A8A',
            color: '#D93838',
            borderRadius: 'var(--radius-sm)',
            padding: '0.8rem 1rem',
            marginBottom: '1.5rem',
            fontWeight: '700',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <User size={18} style={{
                position: 'absolute',
                left: '1.2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-primary)'
              }} />
              <input
                type="text"
                placeholder="Tên của con (Ví dụ: Minh Khôi)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1.1rem 1.2rem 1.1rem 3.2rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  border: '1px solid transparent',
                  backgroundColor: '#F3F4F6',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  transition: 'all 0.25s',
                  fontFamily: 'inherit',
                  color: 'var(--color-secondary)'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF';
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(255, 122, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#F3F4F6';
                  e.target.style.borderColor = 'transparent';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{
              position: 'absolute',
              left: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-primary)'
            }} />
            <input
              type="email"
              placeholder="Địa chỉ Email của bố mẹ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1.1rem 1.2rem 1.1rem 3.2rem',
                fontSize: '1rem',
                fontWeight: '700',
                border: '1px solid transparent',
                backgroundColor: '#F3F4F6',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                transition: 'all 0.25s',
                fontFamily: 'inherit',
                color: 'var(--color-secondary)'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 4px rgba(255, 122, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = '#F3F4F6';
                e.target.style.borderColor = 'transparent';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <KeyRound size={18} style={{
              position: 'absolute',
              left: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-primary)'
            }} />
            <input
              type="password"
              placeholder="Mật khẩu của con"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1.1rem 1.2rem 1.1rem 3.2rem',
                fontSize: '1rem',
                fontWeight: '700',
                border: '1px solid transparent',
                backgroundColor: '#F3F4F6',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                transition: 'all 0.25s',
                fontFamily: 'inherit',
                color: 'var(--color-secondary)'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 4px rgba(255, 122, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = '#F3F4F6';
                e.target.style.borderColor = 'transparent';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary animate-pop"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.1rem',
              fontSize: '1.15rem',
              marginTop: '0.8rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {loading ? 'Đang kết nối...' : (
              <>
                {isSignUp ? 'Đăng Ký Ngay' : 'Đăng Nhập'} <Sparkles size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          borderTop: '1px solid #EEEEEE',
          paddingTop: '1.5rem'
        }}>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              fontSize: '0.95rem',
              fontWeight: '800',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontFamily: 'inherit'
            }}
          >
            {isSignUp ? 'Con đã có tài khoản? Đăng nhập ngay!' : 'Con chưa có tài khoản? Tạo tài khoản mới!'}
          </button>
        </div>
      </div>
    </div>
  );
}
