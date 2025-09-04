// Email Configuration (Admin sender)
// Set the admin's Gmail and App Password here or via environment variables.
// For Gmail, you MUST use an App Password (not your regular password).

const ADMIN_EMAIL_DEFAULT = 'admin@hospital.example';
const ADMIN_APP_PASSWORD_DEFAULT = 'replace-with-gmail-app-password';

const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || ADMIN_EMAIL_DEFAULT;
const adminEmailAppPassword = process.env.ADMIN_EMAIL_APP_PASSWORD || process.env.EMAIL_PASS || ADMIN_APP_PASSWORD_DEFAULT;

const emailConfig = {
  service: 'gmail',
  auth: {
    // Sender will be the admin's email
    user: adminEmail,
    pass: adminEmailAppPassword,
  },
};

// Check if email credentials are properly configured
const isEmailConfigured = () => {
  return (
    adminEmail &&
    adminEmailAppPassword &&
    adminEmail !== ADMIN_EMAIL_DEFAULT &&
    adminEmailAppPassword !== ADMIN_APP_PASSWORD_DEFAULT
  );
};

// Instructions for setting up Gmail App Password:
// 1. Go to your Google Account settings
// 2. Enable 2-Step Verification if not already enabled
// 3. Go to Security > App passwords
// 4. Generate a new app password for "Mail"
// 5. Put that App Password here or set ADMIN_EMAIL_APP_PASSWORD env var
//
// Environment variable options:
// ADMIN_EMAIL=your-admin@gmail.com
// ADMIN_EMAIL_APP_PASSWORD=your-gmail-app-password
// (Fallbacks: EMAIL_USER / EMAIL_PASS)

module.exports = {
  ...emailConfig,
  isEmailConfigured,
};
