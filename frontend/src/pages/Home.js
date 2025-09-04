import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <div id="homeCarousel" className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="4500">
        <div className="carousel-inner rounded">
          <div className="carousel-item active">
             <img src={require('../assets/carousel/slide1.jpg')} className="d-block w-100" alt="Hospital" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">🏥 Welcome to Our Hospital</h1>
              <p>Quality healthcare with compassion and excellence</p>
              <div className="d-flex justify-content-center gap-2">
                <Link to="/appointment" className="btn btn-primary btn-sm">Book Appointment</Link>
                <Link to="/disease-info" className="btn btn-outline-light btn-sm">Disease Info</Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../assets/carousel/slide2.jpg')} className="d-block w-100" alt="Facility" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">Modern Facilities</h1>
              <p>State-of-the-art equipment for accurate diagnosis</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../assets/carousel/slide3.jpg')} className="d-block w-100" alt="Team" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">Expert Team</h1>
              <p>Experienced doctors and nurses dedicated to your care</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../assets/carousel/slide4.jpg')} className="d-block w-100" alt="Lab" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">Advanced Labs</h1>
              <p>Accurate and timely diagnostic services</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../assets/carousel/slide5.jpg')} className="d-block w-100" alt="CT Scan" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">Precision Imaging</h1>
              <p>High-quality CT and MRI imaging</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../assets/carousel/slide6.jpg')} className="d-block w-100" alt="Radiology" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">Radiology</h1>
              <p>Expert radiologists for accurate reports</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../assets/carousel/slide7.jpg')} className="d-block w-100" alt="Operating Room" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">Modern OT</h1>
              <p>Safe and sterile operation theaters</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../assets/carousel/slide8.jpg')} className="d-block w-100" alt="Care" />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h1 className="display-6">Compassionate Care</h1>
              <p>We care for you like family</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Services Section */}
      <div className="services-section mt-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 hover-light-blue" style={{transition:'transform .2s, box-shadow .2s, background-color .2s'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 1rem 3rem rgba(0,0,0,.15)';e.currentTarget.style.backgroundColor='#e9f5ff';}} onMouseLeave={(e)=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='var(--bs-box-shadow-sm)';e.currentTarget.style.backgroundColor='';}}>
              <div className="card-body text-center">
                <div className="display-4 mb-3">👨‍⚕️</div>
                <h5 className="card-title">General Medicine</h5>
                <p className="card-text">
                  Comprehensive medical care for adults and children with experienced physicians.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 hover-light-blue" style={{transition:'transform .2s, box-shadow .2s, background-color .2s'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 1rem 3rem rgba(0,0,0,.15)';e.currentTarget.style.backgroundColor='#e9f5ff';}} onMouseLeave={(e)=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='var(--bs-box-shadow-sm)';e.currentTarget.style.backgroundColor='';}}>
              <div className="card-body text-center">
                <div className="display-4 mb-3">🩺</div>
                <h5 className="card-title">Specialized Care</h5>
                <p className="card-text">
                  Expert treatment in cardiology, neurology, orthopedics, and more.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 hover-light-blue" style={{transition:'transform .2s, box-shadow .2s, background-color .2s'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 1rem 3rem rgba(0,0,0,.15)';e.currentTarget.style.backgroundColor='#e9f5ff';}} onMouseLeave={(e)=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='var(--bs-box-shadow-sm)';e.currentTarget.style.backgroundColor='';}}>
              <div className="card-body text-center">
                <div className="display-4 mb-3">🔬</div>
                <h5 className="card-title">Diagnostic Services</h5>
                <p className="card-text">
                  Advanced laboratory and imaging services for accurate diagnosis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section mt-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                <div className="bg-primary text-white rounded-circle p-2">
                  <span className="fs-4">✓</span>
                </div>
              </div>
              <div>
                <h5>Experienced Medical Staff</h5>
                <p>Our team consists of highly qualified and experienced healthcare professionals.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                <div className="bg-primary text-white rounded-circle p-2">
                  <span className="fs-4">✓</span>
                </div>
              </div>
              <div>
                <h5>Modern Facilities</h5>
                <p>State-of-the-art medical equipment and comfortable patient facilities.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                <div className="bg-primary text-white rounded-circle p-2">
                  <span className="fs-4">✓</span>
                </div>
              </div>
              <div>
                <h5>24/7 Emergency Care</h5>
                <p>Round-the-clock emergency medical services for critical situations.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-4">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                <div className="bg-primary text-white rounded-circle p-2">
                  <span className="fs-4">✓</span>
                </div>
              </div>
              <div>
                <h5>Patient-Centered Care</h5>
                <p>Personalized treatment plans focused on individual patient needs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section with Alert */}
      <div className="contact-section mt-5 text-center bg-light p-4 rounded" style={{transition:'transform .2s'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-3px)';}} onMouseLeave={(e)=>{e.currentTarget.style.transform='none';}}>
        <div className="alert alert-info">
          <strong>Note:</strong> For emergencies, please call our hotline immediately.
        </div>
        <h3>Contact Information</h3>
        <div className="row mt-3">
          <div className="col-md-4">
            <p><strong>Address:</strong><br />
            123 Medical Center Drive<br />
            Healthcare City, HC 12345</p>
          </div>
          <div className="col-md-4">
            <p><strong>Phone:</strong><br />
            Emergency: (555) 123-4567<br />
            General: (555) 987-6543</p>
          </div>
          <div className="col-md-4">
            <p><strong>Email:</strong><br />
            info@hospital.com<br />
            emergency@hospital.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
