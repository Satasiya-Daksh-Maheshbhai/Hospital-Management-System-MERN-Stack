# 🏥 Hospital Management System (MERN Stack)

![GitHub repo size](https://img.shields.io/github/repo-size/Satasiya-Daksh-Maheshbhai/Hospital-Management-System-MERN-Stack)
![GitHub stars](https://img.shields.io/github/stars/Satasiya-Daksh-Maheshbhai/Hospital-Management-System-MERN-Stack?style=social)
![GitHub forks](https://img.shields.io/github/forks/Satasiya-Daksh-Maheshbhai/Hospital-Management-System-MERN-Stack?style=social)
![License](https://img.shields.io/badge/license-MIT-blue)

A full-stack **Hospital Management System** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It allows patients to book appointments, access hospital services, and contact doctors, while admins can manage appointments, patients, and feedback.  
Includes **email integration** for notifications and a **disease information feature** to check symptoms.

---

## ✨ Features

### 👩‍⚕️ Patient/User Side
- User **Registration & Login**
- Book **Appointments** with Doctors
- **Contact Form** with Email Support
- **Disease Info Section** → Search diseases based on symptoms
- Post **Feedback & Reviews**
- Responsive **Home, Services, About** Pages

### 🛠️ Admin Side
- **Admin Login** & Dashboard
- Approve / Reject **Appointments**
- View & Manage **Patient Records**
- Handle **Contact Form Queries** from Database
- Manage **Reviews** from Database

### 📧 Other Features
- Email Notifications (`config/email.js`)
- MongoDB for secure storage
- REST APIs with Express.js
- Responsive UI with React + Bootstrap

---

## 📂 Project Structure

```bash
Hospital-Management-System-MERN-Stack/
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
└── README.md

```

---

# ⚡ Installation & Setup
## 1️⃣ Clone the Repository
### git clone https://github.com/Satasiya-Daksh-Maheshbhai/Hospital-Management-System-MERN-Stack.git
### cd Hospital-Management-System-MERN-Stack

## 2️⃣ Backend Setup
### cd backend
### npm install
### npm start

## Create a .env file in backend/ with:

MONGO_URI = your_mongodb_connection_string
PORT = 5000
EMAIL_USER = your_email@example.com
EMAIL_PASS = your_password_or_app_password

## 3️⃣ Frontend Setup
### cd frontend
### npm install
### npm start


## 🖥️ Tech Stack

Frontend: React.js, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Email Service: Nodemailer

## 🚀 Future Enhancements

Doctor Availability Calendar

Online Payment Gateway for Bookings

SMS/Email Reminders

Role-based Authentication (Patient, Doctor, Admin)
