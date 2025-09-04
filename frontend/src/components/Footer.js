import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-5 bg-dark text-light pt-4 pb-3 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-info">🏥 Hospital</h5>
            <p className="small text-muted">
              Compassionate care, modern facilities, and a patient-first approach.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="text-info">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link className="link-light text-decoration-none" to="/">Home</Link></li>
              <li><Link className="link-light text-decoration-none" to="/disease-info">Disease Info</Link></li>
              <li><Link className="link-light text-decoration-none" to="/appointment">Book Appointment</Link></li>
              <li><Link className="link-light text-decoration-none" to="/services">Services</Link></li>
              <li><Link className="link-light text-decoration-none" to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="text-info">Contact</h6>
            <p className="small mb-1">123 Health St, Wellness City</p>
            <p className="small mb-1">Phone: +1 (555) 123-4567</p>
            <p className="small">Email: support@hospital.example</p>
          </div>
        </div>
        <div className="text-center small text-muted mt-3">
          © {new Date().getFullYear()} Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;


