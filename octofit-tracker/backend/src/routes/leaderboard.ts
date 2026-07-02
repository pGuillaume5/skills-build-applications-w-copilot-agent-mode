import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/leaderboard
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get leaderboard' });
});

// GET /api/leaderboard/teams
router.get('/teams', (req: Request, res: Response) => {
  res.json({ message: 'Get team leaderboard' });
});

// GET /api/leaderboard/users
router.get('/users', (req: Request, res: Response) => {
  res.json({ message: 'Get user leaderboard' });
});

export default router;
