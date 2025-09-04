import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          🏥 Hospital Management System
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {(!user || !isAdmin()) && (
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
            )}
            {(!user || !isAdmin()) && (
              <li className="nav-item">
                <Link className="nav-link" to="/doctors">Doctors</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/disease-info">Disease Info</Link>
            </li>
            {(!user || !isAdmin()) && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-us">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gallery">Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">Contact Us</Link>
                </li>
              </>
            )}
            {user && isAdmin() === false && (
              <li className="nav-item">
                <Link className="nav-link" to="/appointment">Book Appointment</Link>
              </li>
            )}
            {isAdmin() && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/appointments">All Appointments</Link>
                </li>
              </>
            )}
            {user && isAdmin() === false && (
              <li className="nav-item">
                <Link className="nav-link" to="/patient">My Appointments</Link>
              </li>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome, {user.name} ({user.role})
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light btn-sm" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
