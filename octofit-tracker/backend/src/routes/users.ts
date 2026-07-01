import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await User.find().populate('team', 'name city').lean();
    res.json({ resource: 'users', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error });
  }
});

export default router;