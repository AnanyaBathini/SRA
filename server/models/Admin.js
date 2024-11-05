const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Email_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    instituteName: { type: String },
    //id: { type: String, unique: true }  // Optional custom ID for external use
});

// // Generate a unique `id` if not already set
// adminSchema.pre('save', function (next) {
//     if (!this.id) {
//         this.id = new mongoose.Types.ObjectId().toString();
//     }
//     next();
// });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
