import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Experience } from './experience.model';
import { IExperience } from './experience.interface';

const addExperienceIntoDB = async (payload: IExperience) => {
  const result = await Experience.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create data !');
  }

  return result;
};

const getAllExperiencesFromDB = async () => {
  const result = await Experience.find({});
  return result;
};

export const ExperienceService = {
  addExperienceIntoDB,
  getAllExperiencesFromDB,
};
