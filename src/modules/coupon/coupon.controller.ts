import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import { CouponService } from './coupon.service';

// CREATE Coupon
const createCoupon = catchAsync(async (req, res) => {
  const newCoupon = await CouponService.createCouponIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Coupon created successfully!',
    data: newCoupon,
  });
});

// UPDATE Coupon
const updateCoupon = catchAsync(async (req, res) => {
  const updatedCoupon = await CouponService.updateCouponIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon updated successfully',
    data: updatedCoupon,
  });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CouponService.getAllCategoriesFromDB();

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

// GET SINGLE Coupon
const getSingleCoupon = catchAsync(async (req, res) => {
  const Coupon = await CouponService.getSingleCouponFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon retrieved successfully!',
    data: Coupon,
  });
});

// DELETE Coupon
const deleteCoupon = catchAsync(async (req, res) => {
  const deleteCoupon = await CouponService.deleteCouponFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon deleted successfully!',
    data: deleteCoupon,
  });
});

export const CouponController = {
  createCoupon,
  getAllCategories,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
