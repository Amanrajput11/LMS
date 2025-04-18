const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of enrolled course IDs
});

const User = mongoose.model('User', userSchema);

module.exports = User;
