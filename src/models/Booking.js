import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  tutorName: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  phone: { type: String, required: true },
  bookingStatus: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
}, { timestamps: true });

// Indexes for performance
bookingSchema.index({ studentEmail: 1 });
bookingSchema.index({ tutorId: 1 });
bookingSchema.index({ bookingStatus: 1 });

export default mongoose.model('Booking', bookingSchema);
