import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import AllAppointments from "./pages/AllAppointments";
import Appointment from "./pages/Appointment";
import DiseaseInfo from "./pages/DiseaseInfo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Doctors from "./pages/Doctors";

// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/disease-info" element={<DiseaseInfo />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/appointments" element={<AllAppointments />} />
              {/* Backward compatibility if someone uses /admin/appointment */}
              <Route path="/admin/appointment" element={<AllAppointments />} />
              <Route path="/patient" element={<PatientDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
