const mongoose = require('mongoose');
const config = require('./config');

(async () => {
    try {
        await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connection successful');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
})();
