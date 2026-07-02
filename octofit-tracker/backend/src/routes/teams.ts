import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams' });
});

// GET /api/teams/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get team ${id}` });
});

// POST /api/teams
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create new team' });
});

// PUT /api/teams/:id
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Update team ${id}` });
});

// DELETE /api/teams/:id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Delete team ${id}` });
});

export default router;
