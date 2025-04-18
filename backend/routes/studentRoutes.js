const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model includes student data
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

router.get('/profile', async (req, res) => {
    try {
        const studentId = req.user?.id || '64a1234567890abcdef12345'; // Replace with a valid student ID for testing
        console.log('Fetching profile for student ID:', studentId);

        const student = await User.findById(studentId);
        if (!student) {
            console.log('Student not found');
            return res.status(404).json({ message: 'Student not found' });
        }

        console.log('Student data:', student);

        const givenQuizzes = await Quiz.countDocuments({ 'attempts.studentId': studentId });
        console.log('Given quizzes count:', givenQuizzes);

        const enrolledCourses = student.enrolledCourses ? student.enrolledCourses.length : 0;
        console.log('Enrolled courses count:', enrolledCourses);

        const totalQuizzes = await Quiz.countDocuments();
        const progress = totalQuizzes > 0 ? Math.round((givenQuizzes / totalQuizzes) * 100) : 0;
        console.log('Progress:', progress);

        res.status(200).json({
            name: student.name,
            email: student.email,
            givenQuizzes,
            enrolledCourses,
            progress,
        });
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Failed to fetch student profile', error });
    }
});

module.exports = router;
