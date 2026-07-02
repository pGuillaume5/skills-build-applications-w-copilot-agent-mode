import { Router } from 'express';
const router = Router();
// GET /api/users
router.get('/', (req, res) => {
    res.json({ message: 'Get all users' });
});
// GET /api/users/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user ${id}` });
});
// POST /api/users
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Create new user' });
});
// PUT /api/users/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update user ${id}` });
});
// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete user ${id}` });
});
export default router;
//# sourceMappingURL=users.js.map