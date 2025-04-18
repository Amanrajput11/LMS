const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Course = require('../models/Course');

const router = express.Router();

// Ensure the uploads directory exists
const uploadPath = path.join(__dirname, '../uploads/videos/');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer for video uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos/'); // Save videos in the "uploads/videos" directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Add a new course with video
router.post('/', upload.single('video'), async (req, res) => {
    const { courseName, description } = req.body;
    const videoPath = req.file ? `uploads/videos/${req.file.filename}` : null;

    console.log('Request body:', req.body); // Log the request body
    console.log('Uploaded file:', req.file); // Log the uploaded file

    if (!courseName || !description || !videoPath) {
        return res.status(400).json({ message: 'Course name, description, and video are required' });
    }

    try {
        const newCourse = new Course({ courseName, description, videoPath });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error saving course:', error); // Log the error
        res.status(500).json({ message: 'Failed to save course', error });
    }
});

// Fetch all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetch all courses
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Failed to fetch courses', error });
    }
});

// Fetch course count
router.get('/count', async (req, res) => {
    try {
        const count = await Course.countDocuments(); // Fetch the count of courses
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching course count:', error);
        res.status(500).json({ message: 'Failed to fetch course count', error });
    }
});

module.exports = router;
