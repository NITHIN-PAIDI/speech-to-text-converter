import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/sign-in');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="title">Speech to Text Converter</h1>
        <p className="subtitle">Convert your speech into text in real-time using your browser's built-in speech recognition</p>
        <div className="cta-buttons">
          <button onClick={handleStartClick} className="cta-link">Start Converting</button>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>Real-time Conversion</h3>
          <p>See your speech converted to text instantly as you speak</p>
        </div>
        <div className="feature-card">
          <h3>Easy to Use</h3>
          <p>Simple interface with start/stop controls for speech recognition</p>
        </div>
        <div className="feature-card">
          <h3>Free to Use</h3>
          <p>Uses your browser's built-in Web Speech API - no extra costs</p>
        </div>
        <div className="feature-card">
          <h3>Copy & Edit</h3>
          <p>Easy to copy and edit the converted text as needed</p>
        </div>
      </div>
    </div>
  );
};

export default Home;