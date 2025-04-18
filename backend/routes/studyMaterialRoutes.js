const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const StudyMaterial = require('../models/StudyMaterial');

const router = express.Router();

// Ensure the uploads directory exists
const uploadPath = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Add a new study material (PDF upload)
router.post('/', upload.single('file'), async (req, res) => {
    const { title } = req.body;
    const filePath = `uploads/${req.file.filename}`; // Use relative path

    if (!title || !filePath) {
        return res.status(400).json({ message: 'Title and file are required' });
    }

    try {
        const newMaterial = new StudyMaterial({ title, filePath });
        await newMaterial.save();
        res.status(201).json(newMaterial);
    } catch (error) {
        console.error('Error saving study material:', error); // Log the error
        res.status(500).json({ message: 'Failed to save study material', error });
    }
});

// Get all study materials
router.get('/', async (req, res) => {
    try {
        const materials = await StudyMaterial.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch study materials', error });
    }
});

// Get the count of study materials
router.get('/count', async (req, res) => {
    try {
        const count = await StudyMaterial.countDocuments(); // Fetch the count of study materials
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching study material count:', error);
        res.status(500).json({ message: 'Failed to fetch study material count', error });
    }
});

module.exports = router;

