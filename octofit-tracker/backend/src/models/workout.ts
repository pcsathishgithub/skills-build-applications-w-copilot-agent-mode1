import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    description: { type: String, required: true },
    equipment: [{ type: String }],
  },
  { timestamps: true },
);

export const Workout = mongoose.model('Workout', workoutSchema);