// src/app/App.jsx

import React from 'react';
// Import useLocation to track the current page
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';

// Import the icons we need
import { FaTachometerAlt, FaListUl, FaPlus, FaShieldAlt, FaUserCircle } from 'react-icons/fa';

import EventCreationWizard from '../components/wizard/EventCreationWizard';
import EventListScreen from '../components/eventList/EventListScreen';
import HomeScreen from '../components/home/HomeScreen';
import './App.css';

// A small helper component to render the main content with its dynamic header
const AppContent = () => {
  const location = useLocation();

  // This function maps the URL path to a user-friendly title
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Home Dashboard';
      case '/events':
        return 'Events Dashboard';
      case '/create-event':
        return 'Create New Event';
      default:
        return 'QMS Portal';
    }
  };

  return (
    <main className="app-main-content">
      {/* Dynamic Page Header */}
      <div className="page-header">
        <h1>{getPageTitle(location.pathname)}</h1>
      </div>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create-event" element={<EventCreationWizard />} />
          <Route path="/events" element={<EventListScreen />} />
        </Routes>
      </div>
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar Navigation */}
        <nav className="app-sidebar">
          <div>
            <div className="sidebar-logo">
              <FaShieldAlt className="logo-icon" />
              <span>QMS Portal</span>
            </div>
            <div className="sidebar-nav">
              <NavLink to="/">
                <FaTachometerAlt className="nav-icon" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/events">
                <FaListUl className="nav-icon" />
                <span>View Events</span>
              </NavLink>
              <NavLink to="/create-event">
                <FaPlus className="nav-icon" />
                <span>Create Event</span>
              </NavLink>
            </div>
          </div>

          {/* User Profile Section at the bottom */}
          <div className="sidebar-footer">
            <div className="user-profile">
              <FaUserCircle className="user-avatar" />
              <div className="user-details">
                <span className="user-name">Fabia Stany</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <AppContent />
      </div>
    </Router>
  );
}

export default App;