import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Team.find().populate('members', 'name email fitnessLevel').lean();
    res.json({ resource: 'teams', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error });
  }
});

export default router;