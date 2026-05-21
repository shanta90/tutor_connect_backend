import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  tutorName: { type: String, required: true },
  tutorImage: { type: String, required: true },
  subject: { type: String, required: true },
  availableDays: { type: [String], required: true },
  availableTime: { type: String, required: true },
  hourlyFee: { type: Number, required: true },
  totalSlot: { type: Number, required: true },
  sessionStartDate: { type: Date, required: true },
  institution: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  teachingMode: { type: String, required: true },
  creatorEmail: { type: String, required: true },
}, { timestamps: true });

// Indexes for performance
tutorSchema.index({ tutorName: 'text' });
tutorSchema.index({ subject: 1 });
tutorSchema.index({ sessionStartDate: 1 });
tutorSchema.index({ creatorEmail: 1 });

export default mongoose.model('Tutor', tutorSchema);
