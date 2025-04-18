const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const config = require('./config');

(async () => {
    try {
        await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: await bcrypt.hash('admin123', 10),
                role: 'admin',
            },
            {
                name: 'Student User',
                email: 'student@example.com',
                password: await bcrypt.hash('student123', 10),
                role: 'student',
            },
        ];

        await User.insertMany(users);
        console.log('Test users added successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error adding test users:', error);
        process.exit(1);
    }
})();
