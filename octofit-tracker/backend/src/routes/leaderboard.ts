import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .populate('team', 'name city points')
      .sort({ rank: 1 })
      .lean();
    res.json({ resource: 'leaderboard', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error });
  }
});

export default router;