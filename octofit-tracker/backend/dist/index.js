import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';
// Get API URL with Codespaces support
const getApiUrl = () => {
    const codespaceeName = process.env.CODESPACE_NAME;
    if (codespaceeName) {
        return `https://${codespaceeName}-${PORT}.preview.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
const apiUrl = getApiUrl();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database connection
mongoose.connect(MONGODB_URI)
    .then(() => {
    console.log('✓ Connected to MongoDB');
})
    .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
});
// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'OctoFit Tracker Backend is running' });
});
// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 OctoFit Tracker Backend`);
    console.log(`   API URL: ${apiUrl}`);
    console.log(`   MongoDB: ${MONGODB_URI}\n`);
});
//# sourceMappingURL=index.js.map