import React, { useMemo, useState } from "react";

const doctorsData = [
  { name: "Dr. Aisha Khan", specialty: "Cardiologist", phone: "+1 555-201-1001", photo: require('../assets/doctors/doc1.jpg') },
  { name: "Dr. Rohan Mehta", specialty: "Orthopedic Surgeon", phone: "+1 555-201-1002", photo: require('../assets/doctors/doc2.jpg') },
  { name: "Dr. Sara Williams", specialty: "Neurologist", phone: "+1 555-201-1003", photo: require('../assets/doctors/doc3.jpg') },
  { name: "Dr. Imran Ali", specialty: "Pediatrician", phone: "+1 555-201-1004", photo: require('../assets/doctors/doc4.jpg') },
  { name: "Dr. Emily Chen", specialty: "Radiologist", phone: "+1 555-201-1005", photo: require('../assets/doctors/doc5.jpg') },
  { name: "Dr. Luis Martinez", specialty: "General Physician", phone: "+1 555-201-1006", photo: require('../assets/doctors/doc6.jpg') },
];

const Doctors = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doctorsData;
    return doctorsData.filter((d) =>
      d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="doctors-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-heading">Our Doctors</h2>
        <div className="input-group" style={{ maxWidth: 320 }}>
          <span className="input-group-text">Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
            placeholder="Name or specialty"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="alert alert-warning">No doctors match your search.</div>
      ) : (
        <div className="row g-3">
          {filtered.map((d, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0 hover-light-blue"
                style={{ transition: "transform .2s, box-shadow .2s, background-color .2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 1rem 3rem rgba(0,0,0,.15)";
                  e.currentTarget.style.backgroundColor = "#e9f5ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "var(--bs-box-shadow-sm)";
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                <img src={d.photo} alt={d.name} className="card-img-top" style={{ objectFit: "cover", height: 220 }} />
                <div className="card-body">
                  <h5 className="card-title mb-1">{d.name}</h5>
                  <div className="text-muted mb-2">{d.specialty}</div>
                  <div>📞 {d.phone}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;


