import httpStatus from 'http-status';
import { IFile } from '../../interface/file.interface';
import AppError from '../../errors/AppError';
import { IProject } from './project.interface';
import { Project } from './project.model';

const addProjectIntoDB = async (file: IFile, payload: IProject) => {
  if (file && file.path) {
    payload.coverImage = file.path;
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

const updateProjectIntoDB = async (
  file: IFile,
  payload: IProject,
  projectId: string,
) => {
  if (file && file.path) {
    payload.coverImage = file.path;
  }

  const result = await Project.findByIdAndUpdate(
    projectId,
    { ...payload },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update project !',
    );
  }

  return result;
};

const deleteProjectFromDB = async (projectId: string) => {
  const result = await Project.findByIdAndDelete(projectId);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete project !',
    );
  }

  return result;
};

const getSingleProjectFromDB = async (projectId: string) => {
  const result = await Project.findById(projectId);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Project not found with this ID !',
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
  updateProjectIntoDB,
  getSingleProjectFromDB,
  deleteProjectFromDB,
};
