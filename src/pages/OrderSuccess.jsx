import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, bikeName } = location.state || { orderId: 'Unknown', bikeName: 'your bike' };

  // Automatically redirect back to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#10B981" opacity="0.2"/>
            <path d="M16 8L10.5 15.3333L8 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h2 className="success-title">Order Successful!</h2>
        
        <p className="success-message">
          Thank you for purchasing the <strong>{bikeName}</strong>. 
          Your order has been received and is currently being processed.
        </p>

        <div className="order-details">
          <div className="order-detail-row">
            <span className="detail-label">Order ID</span>
            <span className="detail-value">#{orderId}</span>
          </div>
          <div className="order-detail-row">
            <span className="detail-label">Status</span>
            <span className="detail-value status-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.2)' }}>Completed</span>
          </div>
        </div>

        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Redirecting to home in 5 seconds...
        </p>

        <Link to="/" className="continue-shopping-btn">
          Return Now
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
