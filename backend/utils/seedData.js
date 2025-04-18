const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt
const Course = require('../models/Course');
const User = require('../models/User');
const config = require('../config');

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        // Clear existing data
        await Course.deleteMany();
        await User.deleteMany();

        // Hash passwords
        const adminPassword = await bcrypt.hash('password', 10);
        const newAdminPassword = await bcrypt.hash('newadminpassword', 10);
        const studentPassword = await bcrypt.hash('password', 10);

        // Add dummy users
        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@example.com', password: adminPassword, role: 'admin' },
            { name: 'New Admin User', email: 'newadmin@example.com', password: newAdminPassword, role: 'admin' },
            { name: 'Student User', email: 'student@example.com', password: studentPassword, role: 'student' }
        ]);

        // Add dummy courses with quizzes
        const courses = await Course.insertMany([
            {
                title: 'React Basics',
                description: 'Learn the basics of React.',
                image: 'react-course.jpg',
                price: 100,
                prerequisites: ['JavaScript Basics'],
                lessons: [
                    {
                        title: 'Introduction to React',
                        videoUrl: 'https://example.com/video1',
                        quiz: [
                            {
                                question: 'What is React?',
                                options: ['Library', 'Framework', 'Language', 'Tool'],
                                correctAnswer: 'Library'
                            }
                        ]
                    },
                    {
                        title: 'React Components',
                        videoUrl: 'https://example.com/video2',
                        quiz: [
                            {
                                question: 'What is a React component?',
                                options: ['Function', 'Class', 'Both', 'None'],
                                correctAnswer: 'Both'
                            }
                        ]
                    }
                ],
                instructor: users[0]._id
            }
        ]);

        console.log('Dummy data added successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
