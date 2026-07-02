import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/workouts
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all workouts' });
});

// GET /api/workouts/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get workout ${id}` });
});

// POST /api/workouts
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create new workout' });
});

// PUT /api/workouts/:id
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Update workout ${id}` });
});

// DELETE /api/workouts/:id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Delete workout ${id}` });
});

export default router;
