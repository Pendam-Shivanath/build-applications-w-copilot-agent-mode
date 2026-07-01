import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    targetMuscleGroups: [{ type: String, required: true, trim: true }],
    estimatedMinutes: { type: Number, required: true, min: 5 },
    coachTip: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = model('Workout', workoutSchema);

export default Workout;
