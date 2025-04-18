const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const courseRoutes = require('./routes/courseRoutes');
const studyMaterialRoutes = require('./routes/studyMaterialRoutes'); // Ensure this is imported
const quizRoutes = require('./routes/quizRoutes');
const studentRoutes = require('./routes/studentRoutes'); // Import student routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure this middleware is present
app.use(bodyParser.json()); // Ensure this middleware is present
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ensure this middleware is present
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos'))); // Serve uploaded videos

// Routes
app.use('/api/courses', courseRoutes); // Ensure this is registered
app.use('/api/users', require('./routes/userRoutes')); // Ensure this is registered
app.use('/api/study-materials', studyMaterialRoutes); // Ensure this is registered
app.use('/api/quizzes', quizRoutes);
app.use('/api/students', studentRoutes); // Register student routes

// Default route
app.get('/', (req, res) => {
    res.send('Backend API is running...');
});

// MongoDB Connection
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
