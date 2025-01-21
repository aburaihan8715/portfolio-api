import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IFile } from '../../interface/file.interface';
import { ProjectService } from './project.service';

const addProject = catchAsync(async (req, res) => {
  const result = await ProjectService.addProjectIntoDB(
    req.file as IFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data added successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const result = await ProjectService.updateProjectIntoDB(
    req.file as IFile,
    req.body,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectService.deleteProjectFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data deleted successfully',
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const result = await ProjectService.getSingleProjectFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetched successfully',
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjectsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetched successfully',
    data: result,
  });
});

export const ProjectController = {
  addProject,
  getAllProjects,
  updateProject,
  getSingleProject,
  deleteProject,
};
