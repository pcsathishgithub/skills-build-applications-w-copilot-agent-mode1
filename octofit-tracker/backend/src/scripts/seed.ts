import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Alex Morgan', email: 'alex@example.com', username: 'alexm', avatar: 'AM' },
      { name: 'Jordan Lee', email: 'jordan@example.com', username: 'jordanl', avatar: 'JL' },
      { name: 'Taylor Smith', email: 'taylor@example.com', username: 'taylors', avatar: 'TS' },
    ]);
    const teams = await Team.create([
      {
        name: 'Pulse Crew',
        description: 'Consistent daily movement and mindful recovery.',
        members: [users[0]._id, users[1]._id],
        totalPoints: 420,
      },
      {
        name: 'Summit Squad',
        description: 'Strength and endurance for ambitious goals.',
        members: [users[2]._id],
        totalPoints: 275,
      },
    ]);
    await Activity.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Run',
        durationMinutes: 32,
        calories: 315,
        completedAt: new Date('2026-09-10T07:30:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'Cycling',
        durationMinutes: 45,
        calories: 390,
        completedAt: new Date('2026-09-10T18:00:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'Strength',
        durationMinutes: 40,
        calories: 280,
        completedAt: new Date('2026-09-09T16:15:00Z'),
      },
    ]);
    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 240, rank: 1, period: 'weekly' },
      { user: users[1]._id, team: teams[0]._id, points: 180, rank: 2, period: 'weekly' },
      { user: users[2]._id, team: teams[1]._id, points: 155, rank: 3, period: 'weekly' },
    ]);
    await Workout.create([
      {
        title: 'Foundational Full Body',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 25,
        description: 'A balanced circuit for building full-body strength.',
        equipment: ['Mat', 'Dumbbells'],
      },
      {
        title: 'Tempo Cardio Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        description: 'Intervals that develop stamina without sacrificing form.',
        equipment: ['Timer'],
      },
      {
        title: 'Mobility Reset',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 15,
        description: 'A gentle sequence to restore range of motion after training.',
        equipment: ['Mat'],
      },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts populated');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
