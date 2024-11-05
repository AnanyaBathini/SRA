// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Additional fields specific to regular users can be added here if necessary
});

const User = mongoose.model('User', userSchema);
module.exports = User;
