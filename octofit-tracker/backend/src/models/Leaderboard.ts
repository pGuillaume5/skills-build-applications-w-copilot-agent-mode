import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId?: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  rank: number;
  totalPoints: number;
  activitiesCount: number;
  type: 'user' | 'team';
  createdAt: Date;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
    rank: {
      type: Number,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
    },
    activitiesCount: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['user', 'team'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
