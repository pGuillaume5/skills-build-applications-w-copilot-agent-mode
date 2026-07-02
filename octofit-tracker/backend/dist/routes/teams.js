import { Router } from 'express';
const router = Router();
// GET /api/teams
router.get('/', (req, res) => {
    res.json({ message: 'Get all teams' });
});
// GET /api/teams/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get team ${id}` });
});
// POST /api/teams
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Create new team' });
});
// PUT /api/teams/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update team ${id}` });
});
// DELETE /api/teams/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete team ${id}` });
});
export default router;
//# sourceMappingURL=teams.js.map