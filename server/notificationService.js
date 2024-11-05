// notificationService.js
const nodemailer = require('nodemailer');

// Configure the email transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other providers as well
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingNotification = async (email, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
};

module.exports = { sendBookingNotification };
