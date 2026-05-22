import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderSuccess from './pages/OrderSuccess';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="logo">
            <h1>VeloCity</h1>
            <span className="tagline">Premium Bikes & Gear</span>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<OrderSuccess />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} VeloCity. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
