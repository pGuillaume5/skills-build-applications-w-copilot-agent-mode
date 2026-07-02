import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
  captain: mongoose.Types.ObjectId;
  totalPoints: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    captain: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>('Team', TeamSchema);
