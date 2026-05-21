import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, bookingController.createBooking);
router.patch('/:id/cancel', protect, bookingController.cancelBooking);
router.get('/my-bookings', protect, bookingController.getMyBookings);

export default router;
