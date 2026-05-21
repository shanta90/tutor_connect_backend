import Tutor from '../models/Tutor.js';
import APIFeatures from '../utils/APIFeatures.js';

export const createTutor = async (tutorData, creatorEmail) => {
  return await Tutor.create({ ...tutorData, creatorEmail });
};

export const getTutors = async (queryString) => {
  const features = new APIFeatures(Tutor.find(), queryString)
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const tutors = await features.query;
  const total = await Tutor.countDocuments(features.query.getQuery());
  
  return { data: tutors, meta: { total, page: queryString.page || 1 } };
};

export const getTutorById = async (id) => {
  return await Tutor.findById(id);
};

export const updateTutor = async (id, data) => {
  return await Tutor.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteTutor = async (id) => {
  return await Tutor.findByIdAndDelete(id);
};

export const getMyTutors = async (email) => {
  return await Tutor.find({ creatorEmail: email });
};
