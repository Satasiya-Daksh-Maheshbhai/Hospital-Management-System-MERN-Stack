import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
// Simple toast for admin feedback
function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div
      style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

const AdminDashboard = () => {
  const fetchDashboardData = async () => {
    try {
      console.log("[fetchDashboardData] Sending userId:", user?._id);
      if (!user || !user._id) {
        setError("User not logged in or not admin");
        return;
      }
      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      console.log("[fetchDashboardData] Response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("[fetchDashboardData] Data:", data);
        setDashboardData(data);
      } else {
        const text = await response.text();
        setError("Failed to fetch dashboard data: " + text);
        console.error("Dashboard fetch failed:", text);
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Dashboard fetch error:", err);
    }
  };
  const [toast, setToast] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    console.log("[AdminDashboard] user:", user);
    if (user && user.role === "admin") {
      fetchDashboardData();
      fetchPendingAppointments();
      fetchAllAppointments();
    }
  }, [user]);

  // Filter appointments based on search term and status
  useEffect(() => {
    let filtered = allAppointments;
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === statusFilter
      );
    }
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.disease.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredAppointments(filtered);
  }, [allAppointments, searchTerm, statusFilter]);

  const fetchPendingAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/appointments/pending",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPendingAppointments(data);
      }
    } catch (err) {
      console.error("Error fetching pending appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAppointments = async () => {
    try {
      if (!user || !user._id) {
        console.error("User not available for fetching appointments");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/appointments?userId=${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched all appointments:", data);
        setAllAppointments(data);
      } else {
        const text = await response.text();
        console.error("Failed to fetch all appointments:", text);
      }
    } catch (err) {
      console.error("Error fetching all appointments:", err);
    }
  };

  const handleAppointmentAction = async (
    appointmentId,
    action,
    rejectionReason = ""
  ) => {
    if (action === "approve") {
      setToast("Appointment approved! Confirmation email sent to user.");
    } else if (action === "reject") {
      setToast("Appointment rejected.");
    }
    setActionLoading((prev) => ({ ...prev, [appointmentId]: true }));

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/appointments/${appointmentId}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            ...(action === "reject" && { reason: rejectionReason }),
          }),
        }
      );

      if (response.ok) {
        // Refresh data
        fetchDashboardData();
        fetchPendingAppointments();
        fetchAllAppointments(); // Refresh all appointments
      } else {
        const data = await response.json();
        alert(`Failed to ${action} appointment: ${data.message}`);
      }
    } catch (err) {
      alert(`Network error occurred while ${action}ing appointment`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <Toast message={toast} onClose={() => setToast("")} />
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger" role="alert">
          <h4>Access Denied</h4>
          <p>You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Admin Dashboard</h2>
            <div className="text-muted">Welcome, {user.name} (Admin)</div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Dashboard Statistics */}
          {dashboardData && (
            <div className="row mb-5">
              <div className="col-md-2 col-sm-6 mb-3">
                <div className="card bg-primary text-white text-center">
                  <div className="card-body">
                    <h3 className="card-title">
                      {dashboardData.stats.totalAppointments}
                    </h3>
                    <p className="card-text">Total Appointments</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-sm-6 mb-3">
                <div className="card bg-warning text-white text-center">
                  <div className="card-body">
                    <h3 className="card-title">
                      {dashboardData.stats.pendingAppointments}
                    </h3>
                    <p className="card-text">Pending</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-sm-6 mb-3">
                <div className="card bg-success text-white text-center">
                  <div className="card-body">
                    <h3 className="card-title">
                      {dashboardData.stats.approvedAppointments}
                    </h3>
                    <p className="card-text">Approved</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-sm-6 mb-3">
                <div className="card bg-danger text-white text-center">
                  <div className="card-body">
                    <h3 className="card-title">
                      {dashboardData.stats.rejectedAppointments}
                    </h3>
                    <p className="card-text">Rejected</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-sm-6 mb-3">
                <div className="card bg-info text-white text-center">
                  <div className="card-body">
                    <h3 className="card-title">
                      {dashboardData.stats.totalPatients}
                    </h3>
                    <p className="card-text">Total Patients</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pending Appointments */}
          <div className="card">
            <div className="card-header bg-warning text-white">
              <h5 className="mb-0">
                📋 Pending Appointments ({pendingAppointments.length})
              </h5>
            </div>
            <div className="card-body">
              {pendingAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <div className="display-4 text-muted mb-3">✅</div>
                  <h5>No Pending Appointments</h5>
                  <p className="text-muted">
                    All appointments have been processed.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Disease</th>
                        <th>Booked On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingAppointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td>
                            <strong>{appointment.patientName}</strong>
                          </td>
                          <td>{appointment.email}</td>
                          <td>{formatDate(appointment.date)}</td>
                          <td>{formatTime(appointment.time)}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {appointment.disease}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">
                              {formatDate(appointment.createdAt)}
                            </small>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                  handleAppointmentAction(
                                    appointment._id,
                                    "approve"
                                  )
                                }
                                disabled={actionLoading[appointment._id]}
                              >
                                {actionLoading[appointment._id] ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                  ></span>
                                ) : (
                                  "✅ Approve"
                                )}
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  const reason = prompt(
                                    "Please provide a reason for rejection:"
                                  );
                                  if (reason !== null) {
                                    handleAppointmentAction(
                                      appointment._id,
                                      "reject",
                                      reason
                                    );
                                  }
                                }}
                                disabled={actionLoading[appointment._id]}
                              >
                                {actionLoading[appointment._id] ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                  ></span>
                                ) : (
                                  "❌ Reject"
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* All Appointments Summary */}
          <div className="row mb-3">
            <div className="col-md-3">
              <div className="card bg-primary text-white text-center">
                <div className="card-body py-2">
                  <h6 className="mb-0">Total</h6>
                  <small>{allAppointments.length}</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white text-center">
                <div className="card-body py-2">
                  <h6 className="mb-0">Pending</h6>
                  <small>
                    {
                      allAppointments.filter((a) => a.status === "pending")
                        .length
                    }
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white text-center">
                <div className="card-body py-2">
                  <h6 className="mb-0">Approved</h6>
                  <small>
                    {
                      allAppointments.filter((a) => a.status === "approved")
                        .length
                    }
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger text-white text-center">
                <div className="card-body py-2">
                  <h6 className="mb-0">Rejected</h6>
                  <small>
                    {
                      allAppointments.filter((a) => a.status === "rejected")
                        .length
                    }
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* All Appointments */}
          <div className="card mt-4">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                📅 All Appointments ({allAppointments.length})
              </h5>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={fetchAllAppointments}
                title="Refresh appointments"
              >
                🔄 Refresh
              </button>
            </div>
            <div className="card-body">
              {/* Search and Filter Controls */}
              <div className="row mb-3">
                <div className="col-md-5">
                  <div className="input-group">
                    <span className="input-group-text">🔍</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by patient name, email, or disease..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setSearchTerm("")}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-outline-secondary btn-sm w-100"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                    disabled={!searchTerm && statusFilter === "all"}
                  >
                    Clear Filters
                  </button>
                </div>
                <div className="col-md-2">
                  <small className="text-muted d-block">
                    Showing {filteredAppointments.length} of{" "}
                    {allAppointments.length}
                  </small>
                </div>
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <div className="display-4 text-muted mb-3">
                    {allAppointments.length === 0 ? "📋" : "🔍"}
                  </div>
                  <h5>No Appointments Found</h5>
                  <p className="text-muted">
                    {allAppointments.length === 0
                      ? "No appointments have been booked yet."
                      : "No appointments match your search criteria."}
                  </p>
                  {allAppointments.length > 0 && (
                    <button
                      className="btn btn-outline-primary mt-2"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Disease</th>
                        <th>Status</th>
                        <th>Booked On</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td>
                            <strong>{appointment.patientName}</strong>
                          </td>
                          <td>{appointment.email}</td>
                          <td>{formatDate(appointment.date)}</td>
                          <td>{formatTime(appointment.time)}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {appointment.disease}
                            </span>
                          </td>
                          <td>
                            <div>
                              <span
                                className={`badge ${
                                  appointment.status === "approved"
                                    ? "bg-success"
                                    : appointment.status === "rejected"
                                    ? "bg-danger"
                                    : appointment.status === "cancelled"
                                    ? "bg-secondary"
                                    : "bg-warning"
                                }`}
                              >
                                {appointment.status.charAt(0).toUpperCase() +
                                  appointment.status.slice(1)}
                              </span>
                              {appointment.status === "rejected" &&
                                appointment.rejectionReason && (
                                  <div className="mt-1">
                                    <small className="text-danger">
                                      <strong>Reason:</strong>{" "}
                                      {appointment.rejectionReason}
                                    </small>
                                  </div>
                                )}
                            </div>
                          </td>
                          <td>
                            <small className="text-muted">
                              {formatDate(appointment.createdAt)}
                            </small>
                          </td>
                          <td>
                            <small className="text-muted">
                              {appointment.updatedAt
                                ? formatDateTime(appointment.updatedAt)
                                : "Never"}
                            </small>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              {appointment.status === "pending" && (
                                <>
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                      handleAppointmentAction(
                                        appointment._id,
                                        "approve"
                                      )
                                    }
                                    disabled={actionLoading[appointment._id]}
                                  >
                                    {actionLoading[appointment._id] ? (
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                      ></span>
                                    ) : (
                                      "✅ Approve"
                                    )}
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                      const reason = prompt(
                                        "Please provide a reason for rejection:"
                                      );
                                      if (reason !== null) {
                                        handleAppointmentAction(
                                          appointment._id,
                                          "reject",
                                          reason
                                        );
                                      }
                                    }}
                                    disabled={actionLoading[appointment._id]}
                                  >
                                    {actionLoading[appointment._id] ? (
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                      ></span>
                                    ) : (
                                      "❌ Reject"
                                    )}
                                  </button>
                                </>
                              )}
                              {appointment.status === "approved" && (
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() =>
                                    handleAppointmentAction(
                                      appointment._id,
                                      "cancel"
                                    )
                                  }
                                  disabled={actionLoading[appointment._id]}
                                >
                                  {actionLoading[appointment._id] ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                    ></span>
                                  ) : (
                                    "🗑️ Cancel"
                                  )}
                                </button>
                              )}
                              {appointment.status === "rejected" && (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() =>
                                    handleAppointmentAction(
                                      appointment._id,
                                      "approve"
                                    )
                                  }
                                  disabled={actionLoading[appointment._id]}
                                >
                                  {actionLoading[appointment._id] ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                    ></span>
                                  ) : (
                                    "✅ Approve (Rejected)"
                                  )}
                                </button>
                              )}
                              {appointment.status === "cancelled" && (
                                <button
                                  className="btn btn-warning btn-sm"
                                  onClick={() =>
                                    handleAppointmentAction(
                                      appointment._id,
                                      "approve"
                                    )
                                  }
                                  disabled={actionLoading[appointment._id]}
                                >
                                  {actionLoading[appointment._id] ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                    ></span>
                                  ) : (
                                    "✅ Approve (Cancelled)"
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Recent Appointments */}
          {dashboardData &&
            dashboardData.recentAppointments &&
            dashboardData.recentAppointments.length > 0 && (
              <div className="card mt-4">
                <div className="card-header bg-light">
                  <h5 className="mb-0">📅 Recent Appointments</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {dashboardData.recentAppointments
                      .slice(0, 6)
                      .map((appointment) => (
                        <div
                          key={appointment._id}
                          className="col-md-6 col-lg-4 mb-3"
                        >
                          <div className="card border-0 shadow-sm">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="card-title mb-0">
                                  {appointment.patientName}
                                </h6>
                                <span
                                  className={`badge ${
                                    appointment.status === "approved"
                                      ? "bg-success"
                                      : appointment.status === "rejected"
                                      ? "bg-danger"
                                      : "bg-warning"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                              </div>
                              <p className="card-text small">
                                <strong>Date:</strong>{" "}
                                {formatDate(appointment.date)}
                                <br />
                                <strong>Time:</strong>{" "}
                                {formatTime(appointment.time)}
                                <br />
                                <strong>Disease:</strong> {appointment.disease}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
