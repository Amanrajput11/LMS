const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); // Import the Quiz model

// Add a new quiz question
router.post('/', async (req, res) => {
    const { question, options, correctAnswer } = req.body;
    if (!question || !options || !correctAnswer || options.length < 4) {
        return res.status(400).json({ message: 'Invalid quiz data' });
    }

    try {
        const newQuiz = new Quiz({ question, options, correctAnswer });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save quiz', error });
    }
});

// Upload a complete quiz with multiple questions
router.post('/upload', async (req, res) => {
    const { title, questions } = req.body;
    if (!title || !questions || !Array.isArray(questions)) {
        return res.status(400).json({ message: 'Invalid quiz data format. Expected a title and an array of questions.' });
    }

    try {
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz uploaded successfully', quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload quiz', error });
    }
});

// Fetch all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find({}, 'title'); // Fetch only quiz titles
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quizzes', error });
    }
});

// Fetch a single quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quiz', error });
    }
});

// Fetch the count of quizzes
router.get('/count', async (req, res) => {
    try {
        const count = await Quiz.countDocuments(); // Fetch the count of quizzes
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching quiz count:', error);
        res.status(500).json({ message: 'Failed to fetch quiz count', error });
    }
});

module.exports = router;
