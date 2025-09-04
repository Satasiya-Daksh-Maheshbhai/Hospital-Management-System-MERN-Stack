import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Check admin access on mount
  useEffect(() => {
    if (!authLoading && !isAdmin()) {
      navigate("/login");
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (authLoading || !user || !user._id) {
          console.log("Waiting for auth or user ID...");
          return; // Wait for auth to be ready
        }

        console.log("Fetching appointments for admin:", user);

        if (!isAdmin()) {
          setError("Admin access required");
          setLoading(false);
          return;
        }

        // Ensure user._id is valid
        if (!user._id || user._id === "undefined") {
          setError("Invalid user ID");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/admin/appointments?userId=${user._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched appointments:", data);
          setAppointments(data);
        } else {
          const text = await response.text();
          console.error("Failed to fetch appointments:", text);
          setError("Failed to fetch appointments: " + text);
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("Network error occurred: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading && user && user._id && isAdmin()) {
      fetchAppointments();
    }
  }, [user, authLoading, isAdmin]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>All Appointments</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Disease</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No appointments found.
              </td>
            </tr>
          ) : (
            appointments.map((app) => (
              <tr key={app._id}>
                <td>{app.patientName}</td>
                <td>{app.email}</td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>{app.time}</td>
                <td>{app.disease}</td>
                <td>{app.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointments;
