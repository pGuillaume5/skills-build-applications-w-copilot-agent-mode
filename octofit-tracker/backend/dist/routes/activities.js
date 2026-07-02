import { Router } from 'express';
const router = Router();
// GET /api/activities
router.get('/', (req, res) => {
    res.json({ message: 'Get all activities' });
});
// GET /api/activities/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get activity ${id}` });
});
// POST /api/activities
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Create new activity' });
});
// PUT /api/activities/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update activity ${id}` });
});
// DELETE /api/activities/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete activity ${id}` });
});
export default router;
//# sourceMappingURL=activities.js.map