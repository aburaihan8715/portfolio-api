import httpStatus from 'http-status';
import { IFile } from '../../interface/file.interface';
import AppError from '../../errors/AppError';
import { IProject } from './project.interface';
import { Project } from './project.model';

const addProjectIntoDB = async (file: IFile, payload: IProject) => {
  if (file && file.path) {
    payload.image = file.path;
  }

  const result = await Project.create(payload);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create project !',
    );
  }

  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find({});
  return result;
};

export const ProjectService = {
  addProjectIntoDB,
  getAllProjectsFromDB,
};
