import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExperienceService } from './experience.service';

const addExperience = catchAsync(async (req, res) => {
  const result = await ExperienceService.addExperienceIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data added successfully',
    data: result,
  });
});

const getAllExperiences = catchAsync(async (req, res) => {
  const result = await ExperienceService.getAllExperiencesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetched successfully',
    data: result,
  });
});

export const ExperienceController = {
  addExperience,
  getAllExperiences,
};
