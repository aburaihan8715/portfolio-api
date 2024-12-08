import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

// CREATE Coupon
const createCouponIntoDB = async (payload: ICoupon) => {
  const result = await Coupon.create(payload);
  return result;
};

const updateCouponIntoDB = async (
  id: string,
  payload: Partial<ICoupon>,
) => {
  const updatedCoupon = await Coupon.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedCoupon) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Coupon could not be updated!',
    );
  }

  // delete password form the user
  const { __v, ...remainingCoupon } = updatedCoupon.toObject();

  // return tokens and user to the controller
  return remainingCoupon;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Coupon.find({});

  return categories;
};

const getSingleCouponFromDB = async (id: string) => {
  const coupon = await Coupon.findById(id);

  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found !');
  }

  return Coupon;
};

const deleteCouponFromDB = async (id: string) => {
  const deletedCoupon = await Coupon.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found !');
  }

  return deletedCoupon;
};

export const CouponService = {
  createCouponIntoDB,
  updateCouponIntoDB,
  getAllCategoriesFromDB,
  getSingleCouponFromDB,
  deleteCouponFromDB,
};
