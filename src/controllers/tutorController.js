import asyncHandler from '../utils/asyncHandler.js';
import * as tutorService from '../services/tutorService.js';

export const createTutor = asyncHandler(async (req, res) => {
  const tutor = await tutorService.createTutor(req.body, req.user.email);
  res.status(201).json({ success: true, message: 'Tutor created successfully', data: tutor });
});

export const getTutors = asyncHandler(async (req, res) => {
  const { data, meta } = await tutorService.getTutors(req.query);
  res.status(200).json({ success: true, data, meta });
});

export const getTutorById = asyncHandler(async (req, res) => {
  const tutor = await tutorService.getTutorById(req.params.id);
  res.status(200).json({ success: true, data: tutor });
});

export const updateTutor = asyncHandler(async (req, res) => {
  const tutor = await tutorService.updateTutor(req.params.id, req.body);
  res.status(200).json({ success: true, data: tutor });
});

export const deleteTutor = asyncHandler(async (req, res) => {
  await tutorService.deleteTutor(req.params.id);
  res.status(200).json({ success: true, message: 'Tutor deleted successfully' });
});

export const getMyTutors = asyncHandler(async (req, res) => {
  const tutors = await tutorService.getMyTutors(req.user.email);
  res.status(200).json({ success: true, data: tutors });
});
