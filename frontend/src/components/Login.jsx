import './Login.css';
import { useState } from 'react';
import { login, register } from '../api';

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isSignUp) {
        result = await register({ email, password, displayName });
      } else {
        result = await login({ email, password });
      }

      if (result.access_token) {
        localStorage.setItem('diary_token', result.access_token);
        if (typeof onLogin === 'function') {
          await onLogin(result.access_token);
        }
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-book">
        <div className="book-cover">
          <h1 className="book-title">📖 My Personal Diary</h1>
          <p className="book-subtitle">Your thoughts, your memories, your story</p>

          <div className="login-content">
            <p className="welcome-text">{isSignUp ? 'Create Account' : 'Welcome back!'}</p>

            {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
              />
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>
            </form>

            <div className="privacy-note">
              <p>🔒 Your diary is completely private</p>
              <p>Only you can read your entries</p>
            </div>

            <div className="divider">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                style={{background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </div>
        </div>

        <div className="book-spine"></div>
      </div>
    </div>
  );
}

export default Login;

