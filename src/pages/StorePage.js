import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/products/electronics') // Calls your backend, which fetches from FakeStore API
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("✅ Products Fetched from FakeStore API:", data);
        setProducts(data);
      })
      .catch(error => console.error('❌ Error fetching products:', error));
  }, []);
  
  
  

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="p-4 min-h-screen bg-black text-white store-container">
      {/* Store Header */}
      <div className="mb-4 flex justify-center">
        <Link to="/" className="text-4xl font-bold text-white">
          Hardware Marketplace
        </Link>
      </div>

      {/*  Sign Out Button (Fixed to Top Right) */}
      <button onClick={handleSignOut} className="signout-button">
        Sign Out
      </button>

      {/* Store Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-red-500">Electronics Store</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border border-gray-300 rounded-lg w-1/2 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Display */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h2 className="text-md font-semibold mb-1">{product.title}</h2>
              <p className="text-yellow-400 mb-1">${product.price}</p>
              <div className="product-actions">
                <button
                  className="view-details"
                  onClick={() => navigate(`/checkout`, { state: { product } })}
                >
                  View Details
                </button>
                <button
                  className="buy-now"
                  onClick={() => navigate(`/checkout`, { state: { product } })}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default StorePage;
