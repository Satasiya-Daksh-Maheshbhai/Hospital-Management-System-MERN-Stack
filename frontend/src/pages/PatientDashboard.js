import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/patient/${user.email}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        setError('Failed to fetch appointments');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning',
      approved: 'bg-success',
      rejected: 'bg-danger'
    };
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-dashboard">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>My Appointments</h2>
            <div className="text-muted">
              Welcome back, {user?.name}!
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {appointments.length === 0 ? (
            <div className="text-center py-5">
              <div className="display-4 text-muted mb-3">📅</div>
              <h4>No Appointments Found</h4>
              <p className="text-muted">
                You haven't booked any appointments yet.
              </p>
              <a href="/appointment" className="btn btn-primary">
                Book Your First Appointment
              </a>
            </div>
          ) : (
            <div className="row">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span className={`badge ${getStatusBadge(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <small className="text-muted">
                        {formatDate(appointment.date)}
                      </small>
                    </div>
                    <div className="card-body">
                      <h6 className="card-title">{appointment.disease}</h6>
                      <p className="card-text">
                        <strong>Time:</strong> {appointment.time}<br />
                        <strong>Patient:</strong> {appointment.patientName}<br />
                        <strong>Email:</strong> {appointment.email}
                      </p>
                      
                      {appointment.status === 'rejected' && appointment.rejectionReason && (
                        <div className="alert alert-danger alert-sm">
                          <strong>Reason for rejection:</strong><br />
                          {appointment.rejectionReason}
                        </div>
                      )}
                      
                      {appointment.status === 'pending' && (
                        <div className="alert alert-warning alert-sm">
                          <strong>⏳ Pending Approval</strong><br />
                          Your appointment is waiting for admin approval. You will receive an email confirmation once approved.
                        </div>
                      )}
                      
                      {appointment.status === 'approved' && (
                        <div className="alert alert-success alert-sm">
                          <strong>✅ Approved!</strong><br />
                          Please arrive 15 minutes early for your appointment.
                        </div>
                      )}
                    </div>
                    <div className="card-footer text-muted">
                      <small>
                        Booked on: {formatDate(appointment.createdAt)}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h5 className="card-title">Quick Actions</h5>
              <div className="d-flex justify-content-center gap-3">
                <a href="/appointment" className="btn btn-primary">
                  📅 Book New Appointment
                </a>
                <a href="/disease-info" className="btn btn-outline-primary">
                  🔍 Check Disease Info
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
