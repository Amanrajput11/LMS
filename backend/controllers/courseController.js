const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const course = new Course({ ...req.body, instructor: req.user.id });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCoursesByInstructor = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ...other methods...
