import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BikeCard.css';

function BikeCard({ bike }) {
  // Format price to currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(bike.price);

  const [isPurchasing, setIsPurchasing] = React.useState(false);

  const navigate = useNavigate();

  const handleBuyClick = async () => {
    setIsPurchasing(true);
    try {
      const response = await axios.post('/api/orders', {
        bikeId: bike.id,
        bikeName: bike.name,
        totalPrice: bike.price
      });
      
      navigate('/success', { state: { orderId: response.data.id, bikeName: bike.name } });
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again or check if the backend is running.");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="bike-card">
      <div className="card-image-container">
        <img 
          src={bike.imageUrl || "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&auto=format&fit=crop"} 
          alt={bike.name} 
          className="bike-image" 
        />
        <div className="brand-badge">{bike.brand}</div>
      </div>
      <div className="card-content">
        <h4 className="bike-name">{bike.name}</h4>
        <p className="bike-description">{bike.description}</p>
        <div className="card-footer">
          <span className="bike-price">{formattedPrice}</span>
          <button className="buy-button" onClick={handleBuyClick} disabled={isPurchasing}>
            {isPurchasing ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BikeCard;
