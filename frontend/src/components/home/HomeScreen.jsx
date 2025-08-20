import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

function HomeScreen() {
  return (
    <div className="home-screen">
      <div className="background-container">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      
      <div className="welcome-card">
        <div className="card-header">
          <h1>Welcome to the Quality Management System</h1>
          <div className="icon-container">
            <div className="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <p>
          This portal allows you to create, track, and manage all quality-related events
          to ensure continuous improvement and compliance.
        </p>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">📋</div>
            <h3>Create Events</h3>
            <p>Document quality events with detailed information</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor the status of all quality initiatives</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🔍</div>
            <h3>Analyze Data</h3>
            <p>Gain insights from quality metrics and trends</p>
          </div>
        </div>
        
        <Link to="/create-event" className="cta-button">
          Create New Event
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default HomeScreen;