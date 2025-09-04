import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Appointment = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    date: "",
    time: "",
    disease: "",
    customDisease: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [diseaseList, setDiseaseList] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fill form with user data if logged in
    if (user) {
      setFormData((prev) => ({
        ...prev,
        patientName: user.name,
        email: user.email,
      }));
    }

    // Fetch disease list for dropdown
    fetchDiseaseList();
  }, [user]);

  const fetchDiseaseList = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/diseases/list");
      if (response.ok) {
        const data = await response.json();
        setDiseaseList(data.diseases);
      }
    } catch (error) {
      console.error("Error fetching disease list:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "disease") {
      setFormData((prev) => ({
        ...prev,
        disease: value,
        customDisease: "",
      }));
    } else if (name === "customDisease") {
      setFormData((prev) => ({
        ...prev,
        customDisease: value,
        disease: value ? value : prev.disease,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!user) {
      setError("You must be logged in to book an appointment.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Appointment booked successfully! Your appointment is now pending admin approval. You will receive a confirmation email once it is approved."
        );
        setFormData({
          patientName: "",
          email: "",
          date: "",
          time: "",
          disease: "",
        });
        // Pre-fill with user data again if logged in
        setFormData((prev) => ({
          ...prev,
          patientName: user.name,
          email: user.email,
        }));
      } else {
        setError(data.message || "Failed to book appointment");
      }
    } catch (err) {
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate time slots
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white text-center">
            <h3 className="mb-0">Book an Appointment</h3>
          </div>
          <div className="card-body">
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            <div className="alert alert-info" role="alert">
              Appointments require admin approval. You will receive an email upon approval.
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="patientName" className="form-label">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  placeholder="Enter patient's full name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="date" className="form-label">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={today}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="time" className="form-label">
                    Preferred Time
                  </label>
                  <select
                    className="form-select"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="disease" className="form-label">
                  Disease/Condition
                </label>
                <select
                  className="form-select"
                  id="disease"
                  name="disease"
                  value={formData.customDisease ? "" : formData.disease}
                  onChange={handleChange}
                  required
                  disabled={!!formData.customDisease}
                >
                  <option value="">Select disease/condition</option>
                  {diseaseList.map((disease, index) => (
                    <option key={index} value={disease.name}>
                      {disease.name}
                    </option>
                  ))}
                </select>
                <div className="form-text">
                  Can't find your condition? Type it in the field below.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="customDisease" className="form-label">
                  Or Describe Your Condition
                </label>
                <textarea
                  className="form-control"
                  id="customDisease"
                  name="customDisease"
                  rows="3"
                  placeholder="Describe your symptoms or condition in detail..."
                    value={formData.customDisease}
                  onChange={handleChange}
                  disabled={!!formData.disease && !formData.customDisease}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Booking Appointment..." : "Book Appointment"}
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="text-muted">
                <small>
                  * Appointment requests are subject to approval by our medical
                  staff.
                  <br />* You will receive a confirmation email once your
                  appointment is approved.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
