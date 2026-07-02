import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  description?: string;
  date: Date;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'walking', 'gym'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      default: null,
    },
    calories: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
