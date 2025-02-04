import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "https://capstone-2-backend-5oxt.onrender.com"; // ✅ Update with backend URL

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.pathname === '/register');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // ✅ Store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isRegister ? 'register' : 'login';
    const payload = isRegister ? { email, username, password } : { username, password };

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/${endpoint}`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      // ✅ Clear any previous errors when successful
      setError('');

      if (isRegister && response.status === 201) {
        console.log("✅ Registration successful! Redirecting to login...");
        setMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1000);
      } 
      else if (!isRegister && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        console.log("✅ JWT Token Stored:", response.data.token);
        navigate('/store'); // Redirect after login
      }

      setMessage(response.data.message);
    } catch (error) {
      // ✅ Capture backend error messages and display them
      const errorMsg = error.response?.data?.error || 'Something went wrong';
      console.error('❌ Error:', errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <div className="auth-container p-4 min-h-screen flex flex-col items-center">
      <div className="mb-4 self-start">
        <Link to="/" className="text-2xl font-bold text-white">
          Hardware Marketplace
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">{isRegister ? 'Create Account' : 'Sign In'}</h2>
      
      <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded-lg shadow-md">
        {isRegister && (
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-lg w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded-lg w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* ✅ Error Message Display */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button type="submit" className="auth-submit-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      {/* Toggle and Guest Buttons */}
      <div className="auth-buttons">
        <button
          onClick={() => setIsRegister(!isRegister)}
          className={`auth-toggle-button ${isRegister ? 'signin' : 'register'}`}
        >
          {isRegister ? 'Already have an account? Sign in' : 'Need an account? Register'}
        </button>
        <button
          className="text-gray-600 hover:underline"
          onClick={() => navigate('/store')}
        >
          Continue as Guest
        </button>
      </div>

      {/* ✅ Success Message Display */}
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
};

export default AuthForm;
