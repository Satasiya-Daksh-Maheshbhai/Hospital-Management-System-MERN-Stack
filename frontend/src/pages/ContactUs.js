import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const { user, isPatient } = useAuth();
  const [reviews, setReviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !isPatient()) {
      setStatus("You must be logged in as patient to submit the form.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("Thanks for reaching out! We will get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(data.message || "Failed to submit. Try again.");
      }
    } catch (err) {
      setStatus("Network error. Please try again later.");
    }
  };

  // Reviews
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const submitReview = async (e) => {
    e.preventDefault();
    if (!user || !isPatient()) return;
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, rating: reviewForm.rating, comment: reviewForm.comment }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setReviewForm({ rating: 5, comment: "" });
        fetchReviews();
      }
    } catch (err) {}
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews");
      const data = await response.json();
      if (response.ok && data.success) setReviews(data.reviews);
    } catch {}
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="contact-page">
      <div className="row">
        <div className="col-md-6">
          <h2 className="section-heading">Contact Us</h2>
          <p className="text-muted">
            We’re here to help. Send us a message or reach us via the details below.
          </p>

          <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            {status && <div className="alert alert-success">{status}</div>}
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={!user || !isPatient()}>
              {(!user || !isPatient()) ? "Login as Patient to Send" : "Send Message"}
            </button>
          </form>
        </div>

        <div className="col-md-6 mt-4 mt-md-0">
          <div className="card h-100">
            <div className="card-body">
              <h5>Hospital Details</h5>
              <p className="mb-2">🏥 123 Health Street, Wellness City</p>
              <p className="mb-2">📞 +1 (555) 123-4567</p>
              <p className="mb-3">✉️ support@hospital.example</p>
              <div className="ratio ratio-16x9">
                <iframe
                  title="map"
                  src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">Patient Reviews</div>
            <div className="card-body">
              {reviews.length === 0 ? (
                <div className="text-muted">No reviews yet.</div>
              ) : (
                <ul className="list-group list-group-flush">
                  {reviews.map((r) => (
                    <li key={r._id} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <strong>{r.name}</strong>
                        <small className="text-muted">{new Date(r.createdAt).toLocaleString()}</small>
                      </div>
                      <div className="mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < r.rating ? '⭐' : '☆'}</span>
                        ))}
                      </div>
                      <div>{r.comment}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">Write a Review</div>
            <div className="card-body">
              {!user || !isPatient() ? (
                <div className="alert alert-warning">Login as patient to write a review.</div>
              ) : (
                <form onSubmit={submitReview}>
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select className="form-select" value={reviewForm.rating} onChange={(e) => setReviewForm((p) => ({...p, rating: Number(e.target.value)}))}>
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea className="form-control" rows="3" value={reviewForm.comment} onChange={(e) => setReviewForm((p) => ({...p, comment: e.target.value}))} required />
                  </div>
                  <button className="btn btn-success" type="submit">Submit Review</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;


