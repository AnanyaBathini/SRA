// models/Equipment.js
const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment;
