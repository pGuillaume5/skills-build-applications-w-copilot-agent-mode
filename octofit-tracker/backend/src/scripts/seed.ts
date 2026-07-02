/**
 * Seed the octofit_db database with test data
 * 
 * This script initializes the OctoFit Tracker database with realistic sample data
 * including users, teams, activities, workouts, and leaderboard entries.
 * 
 * Usage: npm run seed
 */

import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Workout from '../models/Workout.js';
import Leaderboard from '../models/Leaderboard.js';
import type { IWorkout } from '../models/Workout.js';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB at', MONGODB_URI);

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);
    console.log('✓ Cleared existing collections');

    // Create sample users
    console.log('Creating sample users...');
    const usersData = [
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'Johnson',
        bio: 'Marathon enthusiast',
        totalPoints: 1250,
        rank: 1,
      },
      {
        username: 'jordan_cycles',
        email: 'jordan@example.com',
        password: 'password123',
        firstName: 'Jordan',
        lastName: 'Smith',
        bio: 'Cycling lover',
        totalPoints: 950,
        rank: 2,
      },
      {
        username: 'morgan_swimmer',
        email: 'morgan@example.com',
        password: 'password123',
        firstName: 'Morgan',
        lastName: 'Lee',
        bio: 'Triathlon competitor',
        totalPoints: 1100,
        rank: 3,
      },
      {
        username: 'casey_gym',
        email: 'casey@example.com',
        password: 'password123',
        firstName: 'Casey',
        lastName: 'Williams',
        bio: 'Strength training coach',
        totalPoints: 850,
        rank: 4,
      },
      {
        username: 'riley_walker',
        email: 'riley@example.com',
        password: 'password123',
        firstName: 'Riley',
        lastName: 'Brown',
        bio: 'Nature walker',
        totalPoints: 720,
        rank: 5,
      },
    ];

    const createdUsers = await User.create(usersData);
    console.log('✓ Created', createdUsers.length, 'users');

    // Create sample teams
    console.log('Creating sample teams...');
    const teamsData = [
      {
        name: 'Runners United',
        description: 'A team dedicated to running and marathons',
        captain: createdUsers[0]._id,
        members: [createdUsers[0]._id, createdUsers[2]._id],
        totalPoints: 2350,
        rank: 1,
      },
      {
        name: 'Cycling Crew',
        description: 'Cycling enthusiasts pushing boundaries',
        captain: createdUsers[1]._id,
        members: [createdUsers[1]._id, createdUsers[4]._id],
        totalPoints: 1670,
        rank: 2,
      },
      {
        name: 'Fitness Squad',
        description: 'All-around fitness and wellness',
        captain: createdUsers[3]._id,
        members: [createdUsers[3]._id],
        totalPoints: 850,
        rank: 3,
      },
    ];

    const createdTeams = await Team.create(teamsData);
    console.log('✓ Created', createdTeams.length, 'teams');

    // Update users with team assignments
    await User.updateMany(
      { _id: createdUsers[0]._id },
      { teamId: createdTeams[0]._id }
    );
    await User.updateMany(
      { _id: createdUsers[1]._id },
      { teamId: createdTeams[1]._id }
    );
    await User.updateMany(
      { _id: createdUsers[2]._id },
      { teamId: createdTeams[0]._id }
    );
    await User.updateMany(
      { _id: createdUsers[3]._id },
      { teamId: createdTeams[2]._id }
    );
    await User.updateMany(
      { _id: createdUsers[4]._id },
      { teamId: createdTeams[1]._id }
    );

    // Create sample activities
    console.log('Creating sample activities...');
    const activitiesData = [
      {
        userId: createdUsers[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 650,
        description: 'Morning run in the park',
        date: new Date('2026-07-01'),
        points: 250,
      },
      {
        userId: createdUsers[0]._id,
        type: 'running',
        duration: 60,
        distance: 10,
        calories: 800,
        description: 'Evening long run',
        date: new Date('2026-07-02'),
        points: 300,
      },
      {
        userId: createdUsers[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 900,
        description: 'Road cycling session',
        date: new Date('2026-07-01'),
        points: 350,
      },
      {
        userId: createdUsers[2]._id,
        type: 'swimming',
        duration: 60,
        distance: 2.5,
        calories: 600,
        description: 'Pool training',
        date: new Date('2026-07-02'),
        points: 280,
      },
      {
        userId: createdUsers[3]._id,
        type: 'gym',
        duration: 75,
        calories: 700,
        description: 'Strength training session',
        date: new Date('2026-07-01'),
        points: 300,
      },
      {
        userId: createdUsers[4]._id,
        type: 'walking',
        duration: 30,
        distance: 3,
        calories: 200,
        description: 'Evening walk',
        date: new Date('2026-07-02'),
        points: 100,
      },
    ];

    const createdActivities = await Activity.create(activitiesData);
    console.log('✓ Created', createdActivities.length, 'activities');

    // Create sample workouts
    console.log('Creating sample workouts...');
    const workoutsData: Array<Partial<IWorkout>> = [
      {
        userId: createdUsers[0]._id,
        name: 'Sprint Training',
        description: 'High intensity interval training',
        exercises: [
          { name: 'Sprint 100m', sets: 5, reps: 1 },
          { name: 'Cool down jog', sets: 1, reps: 1 },
        ],
        duration: 45,
        difficulty: 'advanced',
        targetMuscles: ['cardio', 'legs'],
        date: new Date('2026-07-02'),
        completed: true,
      },
      {
        userId: createdUsers[1]._id,
        name: 'Mountain Bike Challenge',
        description: 'Off-road cycling technique session',
        exercises: [
          { name: 'Technical descents', sets: 5, reps: 1 },
          { name: 'Climbing drills', sets: 3, reps: 1 },
        ],
        duration: 90,
        difficulty: 'advanced',
        targetMuscles: ['cardio', 'legs', 'core'],
        date: new Date('2026-07-02'),
        completed: true,
      },
      {
        userId: createdUsers[3]._id,
        name: 'Chest and Triceps',
        description: 'Upper body strength focus',
        exercises: [
          { name: 'Bench press', sets: 4, reps: 8, weight: 185 },
          { name: 'Dumbbell flyes', sets: 3, reps: 10, weight: 40 },
          { name: 'Tricep dips', sets: 3, reps: 12 },
        ],
        duration: 60,
        difficulty: 'intermediate',
        targetMuscles: ['chest', 'triceps'],
        date: new Date('2026-07-02'),
        completed: true,
      },
      {
        userId: createdUsers[2]._id,
        name: 'Beginner Swimming Basics',
        description: 'Learn proper swimming technique',
        exercises: [
          { name: 'Freestyle laps', sets: 10, reps: 1 },
          { name: 'Butterfly stroke practice', sets: 5, reps: 1 },
        ],
        duration: 60,
        difficulty: 'beginner',
        targetMuscles: ['cardio', 'shoulders', 'back'],
        date: new Date('2026-07-02'),
        completed: false,
      },
    ];

    const createdWorkouts = await Workout.create(workoutsData);
    console.log('✓ Created', createdWorkouts.length, 'workouts');

    // Create leaderboard entries
    console.log('Creating leaderboard entries...');
    const leaderboardData = [
      // User rankings
      {
        userId: createdUsers[0]._id,
        rank: 1,
        totalPoints: 1250,
        activitiesCount: 2,
        type: 'user' as const,
      },
      {
        userId: createdUsers[2]._id,
        rank: 2,
        totalPoints: 1100,
        activitiesCount: 1,
        type: 'user' as const,
      },
      {
        userId: createdUsers[1]._id,
        rank: 3,
        totalPoints: 950,
        activitiesCount: 1,
        type: 'user' as const,
      },
      {
        userId: createdUsers[3]._id,
        rank: 4,
        totalPoints: 850,
        activitiesCount: 1,
        type: 'user' as const,
      },
      {
        userId: createdUsers[4]._id,
        rank: 5,
        totalPoints: 720,
        activitiesCount: 1,
        type: 'user' as const,
      },
      // Team rankings
      {
        teamId: createdTeams[0]._id,
        rank: 1,
        totalPoints: 2350,
        activitiesCount: 3,
        type: 'team' as const,
      },
      {
        teamId: createdTeams[1]._id,
        rank: 2,
        totalPoints: 1670,
        activitiesCount: 2,
        type: 'team' as const,
      },
      {
        teamId: createdTeams[2]._id,
        rank: 3,
        totalPoints: 850,
        activitiesCount: 1,
        type: 'team' as const,
      },
    ];

    const createdLeaderboard = await Leaderboard.create(leaderboardData);
    console.log('✓ Created', createdLeaderboard.length, 'leaderboard entries');

    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log('- Users:', createdUsers.length);
    console.log('- Teams:', createdTeams.length);
    console.log('- Activities:', createdActivities.length);
    console.log('- Workouts:', createdWorkouts.length);
    console.log('- Leaderboard entries:', createdLeaderboard.length);

    await mongoose.connection.close();
    console.log('\n✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
