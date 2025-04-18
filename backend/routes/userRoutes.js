const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        console.log('Incoming request data:', req.body); // Log the request data

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err); // Log the error
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('User role:', user.role); // Log the user's role

        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error during login:', error); // Log the error
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Enroll in a course
router.post('/enroll/:courseId', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.enrolledCourses.push(req.params.courseId);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new user (Admin only)
router.post('/add-user', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User added successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
