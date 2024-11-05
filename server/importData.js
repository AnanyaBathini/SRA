const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Admin = require('./models/Admin');
const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');

const MONGO_URI = "mongodb://localhost:27017/resourceScheduler";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

async function importData() {
  try {
    // Load JSON data
    const admins = JSON.parse(fs.readFileSync(path.join(__dirname, 'admindata.json'), 'utf-8'));
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'Userdata.json'), 'utf-8'));
    const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, 'roomdata.json'), 'utf-8'));
    const bookings = JSON.parse(fs.readFileSync(path.join(__dirname, 'bookingsdata.json'), 'utf-8'));

    // Insert data into collections
    await Admin.insertMany(admins);
    await User.insertMany(users);
    await Room.insertMany(rooms);
    await Booking.insertMany(bookings);

    console.log("Data imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
}

importData();
