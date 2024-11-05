// Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userId: String,
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model('Booking', bookingSchema);
