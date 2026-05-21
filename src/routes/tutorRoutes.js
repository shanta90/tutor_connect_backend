import express from 'express';
import * as tutorController from '../controllers/tutorController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// I will define the controller later, for now focusing on routes structure
router.post('/', protect, tutorController.createTutor);
router.get('/', tutorController.getTutors);
router.get('/my-tutors', protect, tutorController.getMyTutors);
router.get('/:id', tutorController.getTutorById);
router.patch('/:id', protect, tutorController.updateTutor);
router.delete('/:id', protect, tutorController.deleteTutor);

export default router;
