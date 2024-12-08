import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import { ReviewService } from './review.service';

// CREATE Review
const createReview = catchAsync(async (req, res) => {
  const newReview = await ReviewService.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully!',
    data: newReview,
  });
});

// UPDATE Review
const updateReview = catchAsync(async (req, res) => {
  const updatedReview = await ReviewService.updateReviewIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: updatedReview,
  });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
  const categories = await ReviewService.getAllCategoriesFromDB();

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

// GET SINGLE Review
const getSingleReview = catchAsync(async (req, res) => {
  const Review = await ReviewService.getSingleReviewFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully!',
    data: Review,
  });
});

// DELETE Review
const deleteReview = catchAsync(async (req, res) => {
  const deleteReview = await ReviewService.deleteReviewFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully!',
    data: deleteReview,
  });
});

export const ReviewController = {
  createReview,
  getAllCategories,
  getSingleReview,
  updateReview,
  deleteReview,
};
