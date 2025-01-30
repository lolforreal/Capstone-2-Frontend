import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = isRegister ? 'register' : 'login';
    const payload = isRegister ? { email, username, password } : { username, password };

    try {
      const response = await axios.post(`http://localhost:3001/api/auth/${endpoint}`, payload);
      
      if (response.data.token) {
        // Store the token and username in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        
        // Redirect user to store page after successful login/register
        navigate('/store');
      }

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong');
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
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <div className="mt-4 flex space-x-4">
        <p onClick={() => setIsRegister(!isRegister)} className="cursor-pointer text-blue-600 hover:underline">
          {isRegister ? 'Already have an account? Sign in' : 'Need an account? Register'}
        </p>
        <button
          className="text-gray-600 hover:underline"
          onClick={() => navigate('/store')}
        >
          Continue as Guest
        </button>
      </div>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default AuthForm;
