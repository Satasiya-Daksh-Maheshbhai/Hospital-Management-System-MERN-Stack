import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="text-center mb-4">
        <h2 className="section-heading">About Us</h2>
        <p className="text-muted">Committed to delivering quality healthcare.</p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5>Our Mission</h5>
              <p>
                To provide patient-centered healthcare with excellence in quality,
                service, and access.
              </p>
              <div className="accordion" id="aboutAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      Values & Approach
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body">
                      Compassion, integrity, and innovation drive our care.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                      Our Team
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body">
                      Experienced doctors, nurses, and support staff dedicated to your well-being.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                      Visiting Hours & Policies
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body">
                      Visiting hours are 4pm–7pm daily. Please sanitize before entry and avoid visits if unwell.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                      Insurance & Billing FAQs
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body">
                      We support major insurance providers and offer transparent billing. Contact our helpdesk for cashless options.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                      Preparing for Surgery
                    </button>
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                    <div className="accordion-body">
                      Follow fasting instructions, bring prior reports, and have a family member accompany you on the day of surgery.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div id="aboutCarousel" className="carousel slide shadow-sm" data-bs-ride="carousel" data-bs-interval="5000">
            <div className="carousel-inner rounded">
              <div className="carousel-item active">
                <img src={require('../assets/about/slide1.jpg')} className="d-block w-100" alt="Hospital" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Modern Facilities</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src={require('../assets/about/slide2.jpg')} className="d-block w-100" alt="Doctors" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Expert Team</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src={require('../assets/about/slide3.jpg')} className="d-block w-100" alt="Care" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Patient-Centered Care</h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src={require('../assets/about/slide4.jpg')} className="d-block w-100" alt="Lab" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Advanced Diagnostics</h5>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#aboutCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#aboutCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="row g-4 mt-2">
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <h6>Accreditations</h6>
              <p className="small text-muted">Nationally accredited, meeting highest standards.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <h6>Community Outreach</h6>
              <p className="small text-muted">Free camps and health awareness programs.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <h6>Insurance Partners</h6>
              <p className="small text-muted">Wide network coverage for cashless treatment.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body">
              <h6>Patient Feedback</h6>
              <p className="small text-muted">Continuous improvement from patient reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


