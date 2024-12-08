import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IFlashSale } from './flashSale.interface';
import { FlashSale } from './flashSale.model';

// CREATE FlashSale
const createFlashSaleIntoDB = async (payload: IFlashSale) => {
  const result = await FlashSale.create(payload);
  return result;
};

const updateFlashSaleIntoDB = async (
  id: string,
  payload: Partial<IFlashSale>,
) => {
  const updatedFlashSale = await FlashSale.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedFlashSale) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'FlashSale could not be updated!',
    );
  }

  // delete password form the user
  const { __v, ...remainingFlashSale } = updatedFlashSale.toObject();

  // return tokens and user to the controller
  return remainingFlashSale;
};

const getAllCategoriesFromDB = async () => {
  const categories = await FlashSale.find({});

  return categories;
};

const getSingleFlashSaleFromDB = async (id: string) => {
  const flashSale = await FlashSale.findById(id);

  if (!flashSale) {
    throw new AppError(httpStatus.NOT_FOUND, 'FlashSale not found !');
  }

  return FlashSale;
};

const deleteFlashSaleFromDB = async (id: string) => {
  const deletedFlashSale = await FlashSale.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedFlashSale) {
    throw new AppError(httpStatus.NOT_FOUND, 'FlashSale not found !');
  }

  return deletedFlashSale;
};

export const FlashSaleService = {
  createFlashSaleIntoDB,
  updateFlashSaleIntoDB,
  getAllCategoriesFromDB,
  getSingleFlashSaleFromDB,
  deleteFlashSaleFromDB,
};
