import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Tutor from '../models/Tutor.js';
import ApiError from '../errors/ApiError.js';

/**
 * Creates a new booking session.
 * It uses a MongoDB Transaction to ensure that updating the tutor's slots 
 * and creating the booking document happen atomically.
 */
export const createBooking = async (bookingData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const tutor = await Tutor.findById(bookingData.tutorId).session(session);
    if (!tutor) throw new ApiError(404, 'Tutor not found');
    if (tutor.totalSlot <= 0) throw new ApiError(400, 'No available slots left.');
    if (new Date() < new Date(tutor.sessionStartDate)) throw new ApiError(400, 'Booking is not available yet for this tutor');

    tutor.totalSlot -= 1;
    await tutor.save({ session });

    const booking = await Booking.create([bookingData], { session });
    
    await session.commitTransaction();
    return booking[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const cancelBooking = async (bookingId) => {
  const booking = await Booking.findByIdAndUpdate(bookingId, { bookingStatus: 'cancelled' }, { new: true });
  if (!booking) throw new ApiError(404, 'Booking not found');
  
  const tutor = await Tutor.findById(booking.tutorId);
  if (tutor) {
    tutor.totalSlot += 1;
    await tutor.save();
  }
  return booking;
};

export const getMyBookings = async (email) => {
  return await Booking.find({ studentEmail: email });
};
