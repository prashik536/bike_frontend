import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeCard from '../components/BikeCard';

function Home() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch bikes from the Moleculer backend
    axios.get('/api/bikes')
      .then(response => {
        // moleculer-db returns { rows: [...], total: ... }
        if (response.data && response.data.rows) {
          setBikes(response.data.rows);
        } else {
          setBikes(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching bikes:", err);
        setError("Failed to load bikes. Is the backend running?");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="hero-section">
        <h2>Find Your Perfect Ride</h2>
        <p>Discover our curated collection of high-performance bicycles for every terrain.</p>
      </section>

      <section className="products-section">
        <h3 className="section-title">Featured Bikes</h3>
        
        {loading && <div className="loader">Loading amazing bikes...</div>}
        
        {error && <div className="error-message">{error}</div>}
        
        {!loading && !error && bikes.length === 0 && (
          <div className="empty-state">No bikes found. Our inventory might be empty!</div>
        )}

        {!loading && !error && bikes.length > 0 && (
          <div className="bike-grid">
            {bikes.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
