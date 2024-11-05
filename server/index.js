
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Admin = require('./models/Admin');
const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const user = require("./Userdata.json");
const rooms = require("./roomdata.json");
const bookings = require("./bookingsdata.json");
const admin = require("./admindata.json");

const app = express();
const PORT = 3033;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Schedule")
  .then(() => { 
    console.log('Connected to MongoDB');
    //populateDatabase();
  })
  .catch(err => console.error('Could not connect to MongoDB', err));

// Set up session middleware
app.use(session({
  secret: 'your_session_secret', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// // Populate database function
// const populateDatabase = async () => {
//   try {
//     await Admin.deleteMany();
//     await User.deleteMany();
//     await Room.deleteMany();
//     await Booking.deleteMany();

//     await Admin.insertMany(admin);
//     await User.insertMany(user);
//     await Room.insertMany(rooms);
//     await Booking.insertMany(bookings);

//     console.log("Database populated with JSON data");
//   } catch (error) {
//     console.error("Error populating database:", error);
//   }
// };

// Authentication middleware using sessions
const authenticate = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Admin check middleware
const isAdmin = (req, res, next) => {
  if (req.session.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Routes
app.get("/api/user", (req, res) => res.json(user));

app.post('/api/admin/signup', async (req, res) => {
  console.log('Received Request Body:', req.body);
  try {
    const { Email_id, username, password, instituteName } = req.body;
    const existingAdmin = await Admin.findOne({ email: Email_id });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({ Email_id, username, password, instituteName });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully', adminId: admin.id });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Failed to register admin', error: error.message });
  }
});

app.post('/api/admin/create-user', isAdmin, async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const Model = role === 'admin' ? Admin : User;
    const user = await Model.findOne({ username, password }); // Check username and password directly
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    // Save user session
    req.session.userId = user._id;
    req.session.role = role;
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate user', error });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Failed to log out' });
    res.json({ message: 'Logged out successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
