import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import { FlashSaleService } from './flashSale.service';

// CREATE FlashSale
const createFlashSale = catchAsync(async (req, res) => {
  const newFlashSale = await FlashSaleService.createFlashSaleIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'FlashSale created successfully!',
    data: newFlashSale,
  });
});

// UPDATE FlashSale
const updateFlashSale = catchAsync(async (req, res) => {
  const updatedFlashSale = await FlashSaleService.updateFlashSaleIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FlashSale updated successfully',
    data: updatedFlashSale,
  });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
  const categories = await FlashSaleService.getAllCategoriesFromDB();

  if (!categories || categories.length < 1) {
    return sendNotFoundDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All categories retrieved successfully!',
    data: categories,
  });
});

// GET SINGLE FlashSale
const getSingleFlashSale = catchAsync(async (req, res) => {
  const FlashSale = await FlashSaleService.getSingleFlashSaleFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FlashSale retrieved successfully!',
    data: FlashSale,
  });
});

// DELETE FlashSale
const deleteFlashSale = catchAsync(async (req, res) => {
  const deleteFlashSale = await FlashSaleService.deleteFlashSaleFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FlashSale deleted successfully!',
    data: deleteFlashSale,
  });
});

export const FlashSaleController = {
  createFlashSale,
  getAllCategories,
  getSingleFlashSale,
  updateFlashSale,
  deleteFlashSale,
};
