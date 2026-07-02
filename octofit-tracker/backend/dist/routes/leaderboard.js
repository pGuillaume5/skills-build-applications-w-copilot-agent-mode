import { Router } from 'express';
const router = Router();
// GET /api/leaderboard
router.get('/', (req, res) => {
    res.json({ message: 'Get leaderboard' });
});
// GET /api/leaderboard/teams
router.get('/teams', (req, res) => {
    res.json({ message: 'Get team leaderboard' });
});
// GET /api/leaderboard/users
router.get('/users', (req, res) => {
    res.json({ message: 'Get user leaderboard' });
});
export default router;
//# sourceMappingURL=leaderboard.js.map