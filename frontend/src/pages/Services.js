import React from "react";

const Services = () => {
  const services = [
    {
      title: "General Consultation",
      description:
        "Routine health check-ups, diagnosis, and guidance by our physicians.",
      icon: "🩺",
    },
    {
      title: "Emergency Care",
      description:
        "24/7 emergency services with rapid response and skilled staff.",
      icon: "🚑",
    },
    {
      title: "Diagnostics",
      description:
        "Comprehensive lab tests and imaging (X-ray, MRI, CT, Ultrasound).",
      icon: "🔬",
    },
    {
      title: "Surgery",
      description: "Elective and emergency surgical procedures with modern OT.",
      icon: "🏥",
    },
    {
      title: "Pharmacy",
      description: "In-house pharmacy with verified medicines and counseling.",
      icon: "💊",
    },
    {
      title: "Physiotherapy",
      description:
        "Rehabilitation and physical therapy personalized to your needs.",
      icon: "🧘",
    },
  ];

  return (
    <div className="services-page">
      <div className="text-center mb-4">
        <h2 className="section-heading">Our Services</h2>
        <p className="text-muted">
          We provide patient-centered care across a wide range of specialties.
        </p>
      </div>

      <div className="row">
        {services.map((service) => (
          <div className="col-md-6 col-lg-4 mb-4" key={service.title}>
            <div className="card h-100 shadow-sm border-0 hover-light-blue" style={{transition: 'transform 0.2s, box-shadow 0.2s, background-color .2s'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 1rem 3rem rgba(0,0,0,.15)';e.currentTarget.style.backgroundColor='#e9f5ff';}} onMouseLeave={(e)=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='var(--bs-box-shadow-sm)';e.currentTarget.style.backgroundColor='';}}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div style={{ fontSize: 28, marginRight: 10 }}>{service.icon}</div>
                  <h5 className="mb-0">{service.title}</h5>
                </div>
                <p className="text-muted mb-0">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5>Need a specific service?</h5>
          <p className="mb-2">
            Book an appointment and mention your requirement in the disease/condition field.
          </p>
          <a className="btn btn-primary" href="/appointment">Book Appointment</a>
        </div>
      </div>
    </div>
  );
};

export default Services;


