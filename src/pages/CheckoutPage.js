import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [newComment, setNewComment] = useState('');

  //  Retrieve username from localStorage (default to 'Guest' if not logged in)
  const storedUsername = localStorage.getItem('username');
  const user = storedUsername && storedUsername !== 'null' ? storedUsername : 'Guest';

  //  Retrieve comments from localStorage for this specific product
  console.log(`🔍 Loading comments for product ID: ${product?.id}`);
const savedComments = JSON.parse(localStorage.getItem(`comments-${product?.id}`)) || [];
console.log("✅ Loaded Comments:", savedComments);
  const [comments, setComments] = useState(savedComments);

  if (!product) {
    return (
      <div className="checkout-container">
        <h2>No product selected</h2>
        <button onClick={() => navigate('/store')} className="checkout-button bg-blue-700 text-white font-bold hover:bg-blue-800 px-6 py-3 rounded-lg">Return to Store</button>
      </div>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, { user, text: newComment }];
      setComments(updatedComments);

      //  Save comments in localStorage for this product
      localStorage.setItem(`comments-${product.id}`, JSON.stringify(updatedComments));
      
      setNewComment('');
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-product-wrapper">
        <div className="checkout-product">
          <img src={product.image} alt={product.title} className="checkout-image" />
          <h2>{product.title}</h2>
          <p className="checkout-price">Price: ${product.price}</p>
        </div>
        <div className="checkout-rating">
          <p className="rating-text">Rating: 5/5 - 1 Review</p>
        </div>
      </div>
      
      {/*  Comment Section (Stored Per Product) */}
      <div className="comment-section">
        <h3 className="comment-title">Comments</h3>
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
        ></textarea>
        <button className="comment-button" onClick={handleAddComment}>Post Comment</button>
        <div className="comment-list">
          {comments.length > 0 ? comments.map((comment, index) => (
            <p key={index} className="comment-text"><strong>{comment.user}:</strong> {comment.text}</p>
          )) : <p className="no-comments">No comments yet.</p>}
        </div>
      </div>

      {/* Payment Error */}
      <div className="checkout-error">
        <p>Sorry! We are currently not accepting any forms of payment right now. We apologize for the inconvenience.</p>
      </div>

      {/* Return to Store */}
      <button onClick={() => navigate('/store')} className="checkout-button bg-blue-700 text-white font-bold hover:bg-blue-800 px-6 py-3 rounded-lg">Return to Store</button>
    </div>
  );
};

export default CheckoutPage;
