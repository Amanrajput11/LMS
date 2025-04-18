const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true }, // Ensure this matches the request body
    description: { type: String, required: true }, // Ensure this matches the request body
    videoPath: { type: String, required: true }, // Ensure this matches the request body
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
