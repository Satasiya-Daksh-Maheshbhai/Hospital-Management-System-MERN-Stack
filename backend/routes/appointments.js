const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

// Configure Nodemailer only if email is configured
let transporter = null;
if (emailConfig.isEmailConfigured()) {
  transporter = nodemailer.createTransport(emailConfig);
}

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new appointment
router.post('/', async (req, res) => {
    try {
        const { patientName, email, date, time, disease } = req.body;
        
        const appointment = new Appointment({
            patientName,
            email,
            date,
            time,
            disease,
            status: 'pending'
        });
        
        const savedAppointment = await appointment.save();
        
        // No email sent here - email will be sent only after admin approval
        console.log('Appointment created successfully - waiting for admin approval');
        
        res.status(201).json({
            message: 'Appointment created successfully and pending admin approval',
            appointment: savedAppointment
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update appointment status (admin only)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Send email notification if status is approved or rejected
        if (status === 'approved' && transporter) {
            const mailOptions = {
                from: emailConfig.auth.user,
                to: updatedAppointment.email,
                subject: 'Appointment Approved - Hospital Management System',
                html: `
                    <h2>Appointment Approved!</h2>
                    <p>Dear ${updatedAppointment.patientName},</p>
                    <p>Your appointment has been approved with the following details:</p>
                    <ul>
                        <li><strong>Date:</strong> ${new Date(updatedAppointment.date).toLocaleDateString()}</li>
                        <li><strong>Time:</strong> ${updatedAppointment.time}</li>
                        <li><strong>Disease/Condition:</strong> ${updatedAppointment.disease}</li>
                        <li><strong>Status:</strong> Approved</li>
                    </ul>
                    <p>Please arrive 15 minutes before your scheduled time.</p>
                    <p>If you need to reschedule, please contact us immediately.</p>
                    <p>Thank you for choosing our hospital.</p>
                    <p>Best regards,<br>Hospital Management Team</p>
                `
            };
            
            try {
                await transporter.sendMail(mailOptions);
                console.log('Approval email sent successfully');
            } catch (emailError) {
                console.error('Error sending approval email:', emailError);
            }
        } else if (status === 'rejected' && transporter) {
            const mailOptions = {
                from: emailConfig.auth.user,
                to: updatedAppointment.email,
                subject: 'Appointment Update - Hospital Management System',
                html: `
                    <h2>Appointment Status Update</h2>
                    <p>Dear ${updatedAppointment.patientName},</p>
                    <p>Unfortunately, your appointment has been rejected.</p>
                    <p><strong>Appointment Details:</strong></p>
                    <ul>
                        <li><strong>Date:</strong> ${new Date(updatedAppointment.date).toLocaleDateString()}</li>
                        <li><strong>Time:</strong> ${updatedAppointment.time}</li>
                        <li><strong>Disease/Condition:</strong> ${updatedAppointment.disease}</li>
                        <li><strong>Status:</strong> Rejected</li>
                    </ul>
                    <p>Please contact us to reschedule or discuss alternative options.</p>
                    <p>We apologize for any inconvenience caused.</p>
                    <p>Best regards,<br>Hospital Management Team</p>
                `
            };
            
            try {
                await transporter.sendMail(mailOptions);
                console.log('Rejection email sent successfully');
            } catch (emailError) {
                console.error('Error sending rejection email:', emailError);
            }
        }
        
        res.json({
            message: 'Appointment status updated successfully',
            appointment: updatedAppointment
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update appointment details
router.put('/:id', async (req, res) => {
    try {
        const { patientName, email, date, time, disease } = req.body;
        
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { patientName, email, date, time, disease },
            { new: true }
        );
        
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        res.json({
            message: 'Appointment updated successfully',
            appointment: updatedAppointment
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get appointments by email (for patients to see their appointments)
router.get('/patient/:email', async (req, res) => {
    try {
        const appointments = await Appointment.find({ 
            email: req.params.email 
        }).sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
