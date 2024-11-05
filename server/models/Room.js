
// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  equipment: [{ type: String }] // Array of equipment names
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;