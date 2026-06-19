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
      minHeight: '80vh',
      padding: '1rem'
    }}>
      <div className="glass-panel animate-pop" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '2.5rem 2rem',
        border: '3px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Kid Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="animate-float" style={{
            fontSize: '4.5rem',
            marginBottom: '0.5rem',
            display: 'inline-block'
          }}>
            🦁
          </div>
          <h1 style={{ 
            fontSize: '2.2rem', 
            color: 'var(--color-primary)', 
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            FinanceKids
          </h1>
          <p style={{ color: 'var(--color-text-light)', fontWeight: '700' }}>
            {isSignUp ? 'Đăng ký tài khoản hiệp sĩ tài chính mới' : 'Đăng nhập vào hành trình học tập'}
          </p>
        </div>

        {error && (
          <div className="animate-pop" style={{
            backgroundColor: '#FFECEC',
            border: '2px solid var(--color-primary)',
            color: 'var(--color-primary)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.8rem 1rem',
            marginBottom: '1.5rem',
            fontWeight: '700',
            fontSize: '0.95rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <User size={20} style={{
                position: 'absolute',
                left: '1.2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-secondary)'
              }} />
              <input
                type="text"
                placeholder="Tên của con (Ví dụ: Minh Khôi)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem 1rem 3.2rem',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  border: '3px solid #E0E0E0',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{
              position: 'absolute',
              left: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-secondary)'
            }} />
            <input
              type="email"
              placeholder="Địa chỉ Email của bố mẹ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem 1.2rem 1rem 3.2rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                border: '3px solid #E0E0E0',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                transition: 'border-color 0.3s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
              onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <KeyRound size={20} style={{
              position: 'absolute',
              left: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-secondary)'
            }} />
            <input
              type="password"
              placeholder="Mật khẩu của con"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem 1.2rem 1rem 3.2rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                border: '3px solid #E0E0E0',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                transition: 'border-color 0.3s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
              onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary animate-pop"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.1rem',
              fontSize: '1.3rem',
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? 'Đang kết nối...' : (
              <>
                {isSignUp ? 'Đăng Ký Ngay' : 'Đăng Nhập'} <Sparkles size={20} />
              </>
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          borderTop: '2px solid #F0F0F0',
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
              color: 'var(--color-secondary)',
              fontSize: '1.05rem',
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
