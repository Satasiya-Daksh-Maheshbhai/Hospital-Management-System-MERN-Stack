# 🏥 Hospital Management Website (MERN Stack)

A full-stack **Hospital Management System** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It provides patients with online appointment booking and hospital services while giving admins the ability to manage appointments, users, and reviews.  
Includes **email integration** for notifications.

---

## ✨ Features

### 👩‍⚕️ Patient/User Side
- User Registration & Login
- Book Appointments with Doctors
- Contact Form with Email Support
- Post Feedback & Reviews
- Responsive Home, Services, About Pages

### 🛠️ Admin Side
- Admin Login & Dashboard
- Approve / Reject Appointments
- View & Manage Patient Records
- Handle Contact Form Queries
- Manage Reviews

### 📧 Other Features
- Email Notifications (`config/email.js`)
- MongoDB for data storage
- REST APIs with Express.js
- Responsive Frontend using React + Bootstrap

---

## 📂 Project Structure

```bash
HOSPITAL_1__USING_VSCODE_1_tryyyyyyyy/
│
├── backend/              # Node.js + Express Backend
│   ├── config/           # Email & DB Config
│   ├── models/           # MongoDB Schemas (User, Appointment, Review, ContactUs)
│   ├── server.js         # Main Server File
│   ├── package.json      # Backend Dependencies
│   └── .env              # Environment Variables
│
├── frontend/             # React Frontend
│   ├── public/           
│   ├── src/              
│   │   ├── components/   # Navbar, Footer, etc.
│   │   ├── pages/        # Home, Login, Register, Appointment, Contact
│   │   └── App.js
│   ├── package.json      # Frontend Dependencies
│
├── A1_22_hospital_website.pptx   # Project Presentation
└── README.md
