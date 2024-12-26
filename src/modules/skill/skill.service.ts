import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Skill } from './skill.model';
import { ISkill } from './skill.interface';

const addSkillIntoDB = async (payload: ISkill) => {
  const result = await Skill.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create data !');
  }

  return result;
};

const getAllSkillsFromDB = async () => {
  const result = await Skill.find({});
  return result;
};

export const SkillService = {
  addSkillIntoDB,
  getAllSkillsFromDB,
};
