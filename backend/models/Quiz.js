const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
