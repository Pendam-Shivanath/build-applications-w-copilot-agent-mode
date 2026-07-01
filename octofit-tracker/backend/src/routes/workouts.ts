import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Workout.find().lean();
    res.json({ resource: 'workouts', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error });
  }
});

export default router;