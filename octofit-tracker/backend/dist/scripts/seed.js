"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';
const seed = async () => {
    // Seed the octofit_db database with test data
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        User_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    const teams = await Team_1.default.insertMany([
        { name: 'Summit Sprinters', city: 'Seattle', points: 1420 },
        { name: 'Bay Blitz', city: 'San Francisco', points: 1375 },
        { name: 'River Rowers', city: 'Austin', points: 1280 },
    ]);
    const users = await User_1.default.insertMany([
        {
            name: 'Nina Patel',
            email: 'nina.patel@octofit.dev',
            age: 29,
            fitnessLevel: 'advanced',
            team: teams[0]._id,
        },
        {
            name: 'Marcus Lee',
            email: 'marcus.lee@octofit.dev',
            age: 34,
            fitnessLevel: 'intermediate',
            team: teams[1]._id,
        },
        {
            name: 'Ava Johnson',
            email: 'ava.johnson@octofit.dev',
            age: 26,
            fitnessLevel: 'beginner',
            team: teams[2]._id,
        },
        {
            name: 'Diego Ramos',
            email: 'diego.ramos@octofit.dev',
            age: 31,
            fitnessLevel: 'intermediate',
            team: teams[0]._id,
        },
    ]);
    await Promise.all([
        Team_1.default.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[3]._id] }),
        Team_1.default.findByIdAndUpdate(teams[1]._id, { members: [users[1]._id] }),
        Team_1.default.findByIdAndUpdate(teams[2]._id, { members: [users[2]._id] }),
    ]);
    await Activity_1.default.insertMany([
        {
            user: users[0]._id,
            type: 'run',
            durationMinutes: 45,
            caloriesBurned: 520,
            completedAt: new Date('2026-06-28T07:15:00.000Z'),
        },
        {
            user: users[1]._id,
            type: 'cycle',
            durationMinutes: 60,
            caloriesBurned: 610,
            completedAt: new Date('2026-06-29T18:20:00.000Z'),
        },
        {
            user: users[2]._id,
            type: 'yoga',
            durationMinutes: 35,
            caloriesBurned: 210,
            completedAt: new Date('2026-06-30T06:45:00.000Z'),
        },
        {
            user: users[3]._id,
            type: 'strength',
            durationMinutes: 50,
            caloriesBurned: 480,
            completedAt: new Date('2026-06-30T20:00:00.000Z'),
        },
    ]);
    await Leaderboard_1.default.insertMany([
        {
            team: teams[0]._id,
            score: 1420,
            rank: 1,
            weekOf: new Date('2026-06-29T00:00:00.000Z'),
        },
        {
            team: teams[1]._id,
            score: 1375,
            rank: 2,
            weekOf: new Date('2026-06-29T00:00:00.000Z'),
        },
        {
            team: teams[2]._id,
            score: 1280,
            rank: 3,
            weekOf: new Date('2026-06-29T00:00:00.000Z'),
        },
    ]);
    await Workout_1.default.insertMany([
        {
            title: 'Power Legs Circuit',
            difficulty: 'intermediate',
            targetMuscleGroups: ['quads', 'hamstrings', 'glutes'],
            estimatedMinutes: 40,
            coachTip: 'Focus on tempo and controlled lowering for each rep.',
        },
        {
            title: 'Core Stability Flow',
            difficulty: 'beginner',
            targetMuscleGroups: ['core', 'lower back'],
            estimatedMinutes: 25,
            coachTip: 'Breathe deeply and keep your rib cage stacked over your hips.',
        },
        {
            title: 'Upper Body Endurance Blast',
            difficulty: 'advanced',
            targetMuscleGroups: ['chest', 'back', 'shoulders', 'triceps'],
            estimatedMinutes: 50,
            coachTip: 'Use strict form and minimize rest to keep heart rate high.',
        },
    ]);
    console.log('Seeding complete. Collections populated in octofit_db.');
    await mongoose_1.default.disconnect();
};
void seed().catch(async (error) => {
    console.error('Failed to seed octofit_db', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
