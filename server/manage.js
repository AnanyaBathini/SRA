// routes/manage.js
const express = require('express');
const Room = require('../models/Room');
const Equipment = require('../models/Equipment');
const { isAdmin } = require('../authMiddleware');
const router = express.Router();

// Add a room
router.post('/rooms', isAdmin, async (req, res) => {
  try {
    const { name, capacity, equipment } = req.body;
    const room = new Room({ name, capacity, equipment });
    const savedRoom = await room.save();
    res.status(201).json({ message: 'Room added successfully', room: savedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add room', error });
  }
});

// Add equipment
router.post('/equipment', isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const equipment = new Equipment({ name, description });
    const savedEquipment = await equipment.save();
    res.status(201).json({ message: 'Equipment added successfully', equipment: savedEquipment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add equipment', error });
  }
});

module.exports = router;
