const fs = require('fs');
const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Ensure this path is correct

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });

// Load the JSON data
const loadAdminData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('path/to/admindata.json', 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
};

// Validate admin data
const validateAdminData = (admin) => {
    const errors = [];
    if (!admin.Email_id || !admin.Username || !admin.Password) {
        errors.push('Email_id, Username, and Password are required.');
    }
    // Add more validation checks as needed (e.g., email format)
    return errors;
};

// Function to insert valid admins into the database
const insertAdmins = async (admins) => {
    for (const admin of admins) {
        const errors = validateAdminData(admin);
        if (errors.length > 0) {
            console.log(`Validation errors for admin ${admin.Username}:`, errors);
            continue; // Skip to the next admin if there are errors
        }

        // Check for existing admin by email
        const existingAdmin = await Admin.findOne({ email: admin.Email_id });
        if (existingAdmin) {
            console.log(`Admin with email ${admin.Email_id} already exists.`);
            continue;
        }

        const newAdmin = new Admin({
            email: admin.Email_id,
            username: admin.Username,
            password: admin.Password, // Consider hashing this
            instituteName: admin.Institute
        });

        await newAdmin.save();
        console.log(`Admin ${admin.Username} registered successfully.`);
    }
};

// Main function to execute the process
const main = async () => {
    try {
        const adminData = await loadAdminData();
        await insertAdmins(adminData);
    } catch (error) {
        console.error('Error loading admin data:', error);
    } finally {
        mongoose.connection.close();
    }
};

main();
