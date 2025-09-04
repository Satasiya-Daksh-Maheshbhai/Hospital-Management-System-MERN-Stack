const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const emailConfig = require("../config/email");

// Configure Nodemailer for admin notifications only if email is configured
let transporter = null;
if (emailConfig.isEmailConfigured()) {
  transporter = nodemailer.createTransport(emailConfig);
}

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get admin dashboard data
router.post("/dashboard", isAdmin, async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: "pending",
    });
    const approvedAppointments = await Appointment.countDocuments({
      status: "approved",
    });
    const rejectedAppointments = await Appointment.countDocuments({
      status: "rejected",
    });
    const totalPatients = await User.countDocuments({ role: "patient" });

    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalAppointments,
        pendingAppointments,
        approvedAppointments,
        rejectedAppointments,
        totalPatients,
      },
      recentAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pending appointments
router.post("/appointments/pending", isAdmin, async (req, res) => {
  try {
    const pendingAppointments = await Appointment.find({
      status: "pending",
    }).sort({ date: 1 });
    res.json(pendingAppointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all appointments (admin only)
router.get("/appointments", async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Check for undefined, null, or missing userId
    if (!userId || userId === "undefined" || userId === "null") {
      return res.status(401).json({ message: "Valid User ID required" });
    }

    // Validate ObjectId format using mongoose
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    console.error("Error in /appointments endpoint:", error);
    res.status(500).json({ message: error.message });
  }
});

// Approve appointment
router.put("/appointments/:id/approve", isAdmin, async (req, res) => {
  try {
    const { userId } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Send approval email to patient
    const mailOptions = {
      from: emailConfig.auth.user,
      to: appointment.email,
      subject: "Appointment Approved - Hospital Management System",
      html: `
                <h2>Appointment Approved!</h2>
                <p>Dear ${appointment.patientName},</p>
                <p>Your appointment has been approved with the following details:</p>
                <ul>
                    <li><strong>Date:</strong> ${new Date(
                      appointment.date
                    ).toLocaleDateString()}</li>
                    <li><strong>Time:</strong> ${appointment.time}</li>
                    <li><strong>Disease/Condition:</strong> ${
                      appointment.disease
                    }</li>
                    <li><strong>Status:</strong> Approved</li>
                </ul>
                <p>Please arrive 15 minutes before your scheduled time. If you need to reschedule, please contact us immediately.</p>
                <p style="padding:12px 16px;background:#e9f5ff;border-left:4px solid #0d6efd;border-radius:4px;">
                  <strong>Thank you</strong> for trusting our hospital with your care. Our team is grateful for the opportunity to serve you and will ensure a smooth and compassionate experience.
                </p>
                <p style="margin-top:12px">
                  <strong>Need help?</strong> Call us at (555) 123-4567 or reply to this email.
                </p>
                <p>Warm regards,<br><strong>Hospital Management Team</strong></p>
            `,
    };

    try {
      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log("Approval email sent successfully");
      } else {
        console.log(
          "Email not configured - skipping approval email notification"
        );
      }
    } catch (emailError) {
      console.error("Error sending approval email:", emailError);
    }

    res.json({
      message: "Appointment approved successfully",
      appointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reject appointment
router.put("/appointments/:id/reject", isAdmin, async (req, res) => {
  try {
    const { userId, reason } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        rejectionReason: reason || "Appointment rejected by admin",
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Send rejection email to patient
    const mailOptions = {
      from: emailConfig.auth.user,
      to: appointment.email,
      subject: "Appointment Update - Hospital Management System",
      html: `
                <h2>Appointment Status Update</h2>
                <p>Dear ${appointment.patientName},</p>
                <p>Unfortunately, your appointment has been rejected.</p>
                <p><strong>Appointment Details:</strong></p>
                <ul>
                    <li><strong>Date:</strong> ${new Date(
                      appointment.date
                    ).toLocaleDateString()}</li>
                    <li><strong>Time:</strong> ${appointment.time}</li>
                    <li><strong>Disease/Condition:</strong> ${
                      appointment.disease
                    }</li>
                    <li><strong>Status:</strong> Rejected</li>
                </ul>
                <p><strong>Reason:</strong> ${appointment.rejectionReason}</p>
                <p>Please contact us to reschedule or discuss alternative options.</p>
                <p>We apologize for any inconvenience caused.</p>
                <p>Best regards,<br>Hospital Management Team</p>
            `,
    };

    try {
      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log("Rejection email sent successfully");
      } else {
        console.log(
          "Email not configured - skipping rejection email notification"
        );
      }
    } catch (emailError) {
      console.error("Error sending rejection email:", emailError);
    }

    res.json({
      message: "Appointment rejected successfully",
      appointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel appointment
router.put("/appointments/:id/cancel", isAdmin, async (req, res) => {
  try {
    const { userId } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Send cancellation email to patient
    const mailOptions = {
      from: emailConfig.auth.user,
      to: appointment.email,
      subject: "Appointment Cancelled - Hospital Management System",
      html: `
                <h2>Appointment Cancelled</h2>
                <p>Dear ${appointment.patientName},</p>
                <p>Your appointment has been cancelled by the admin.</p>
                <p><strong>Appointment Details:</strong></p>
                <ul>
                    <li><strong>Date:</strong> ${new Date(
                      appointment.date
                    ).toLocaleDateString()}</li>
                    <li><strong>Time:</strong> ${appointment.time}</li>
                    <li><strong>Disease/Condition:</strong> ${
                      appointment.disease
                    }</li>
                    <li><strong>Status:</strong> Cancelled</li>
                </ul>
                <p>Please contact us to reschedule or discuss alternative options.</p>
                <p>We apologize for any inconvenience caused.</p>
                <p>Best regards,<br>Hospital Management Team</p>
            `,
    };

    try {
      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log("Cancellation email sent successfully");
      } else {
        console.log(
          "Email not configured - skipping cancellation email notification"
        );
      }
    } catch (emailError) {
      console.error("Error sending cancellation email:", emailError);
    }

    res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users (admin only)
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role
router.put("/users/:id/role", isAdmin, async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!["patient", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
