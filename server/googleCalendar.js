// googleCalendar.js
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// OAuth2 client setup
const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Add a booking to Google Calendar
const addBookingToCalendar = async (bookingDetails) => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event = {
    summary: `Meeting Room Booking - ${bookingDetails.roomName}`,
    description: `Room booked by ${bookingDetails.userEmail}`,
    start: { dateTime: bookingDetails.startTime },
    end: { dateTime: bookingDetails.endTime },
  };

  try {
    await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    console.log('Event added to Google Calendar');
  } catch (error) {
    console.error('Error adding to Google Calendar:', error);
  }
};

module.exports = { addBookingToCalendar };
