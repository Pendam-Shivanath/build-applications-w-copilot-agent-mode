import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .populate('user', 'name email fitnessLevel')
      .sort({ completedAt: -1 })
      .lean();
    res.json({ resource: 'activities', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error });
  }
});

export default router;