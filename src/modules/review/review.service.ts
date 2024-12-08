import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IReview } from './review.interface';
import { Review } from './review.model';

// CREATE Review
const createReviewIntoDB = async (payload: IReview) => {
  const result = await Review.create(payload);
  return result;
};

const updateReviewIntoDB = async (
  id: string,
  payload: Partial<IReview>,
) => {
  const updatedReview = await Review.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedReview) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Review could not be updated!',
    );
  }

  // delete password form the user
  const { __v, ...remainingReview } = updatedReview.toObject();

  // return tokens and user to the controller
  return remainingReview;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Review.find({});

  return categories;
};

const getSingleReviewFromDB = async (id: string) => {
  const review = await Review.findById(id);

  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found !');
  }

  return Review;
};

const deleteReviewFromDB = async (id: string) => {
  const deletedReview = await Review.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedReview) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found !');
  }

  return deletedReview;
};

export const ReviewService = {
  createReviewIntoDB,
  updateReviewIntoDB,
  getAllCategoriesFromDB,
  getSingleReviewFromDB,
  deleteReviewFromDB,
};
