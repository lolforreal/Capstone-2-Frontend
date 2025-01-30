import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import AuthForm from './components/AuthForm';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
