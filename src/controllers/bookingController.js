import asyncHandler from '../utils/asyncHandler.js';
import * as bookingService from '../services/bookingService.js';

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking({ ...req.body, studentEmail: req.user.email });
  res.status(201).json({ status: 'success', data: booking });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.params.id);
  res.status(200).json({ status: 'success', data: booking });
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.getMyBookings(req.user.email);
  res.status(200).json({ status: 'success', data: bookings });
});
