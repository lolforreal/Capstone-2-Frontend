import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Make sure the CSS file is imported

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Hardware Marketplace</h1>
      <div className="home-buttons">
        <button onClick={() => navigate('/register')}>Create Account</button>
        <button onClick={() => navigate('/login')}>Sign In</button>
        <button onClick={() => navigate('/store')}>Continue as Guest</button>
      </div>
    </div>
  );
};

export default HomePage;
