import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import { CartService } from './cart.service';

// CREATE Cart
const createCart = catchAsync(async (req, res) => {
  const newCart = await CartService.createCartIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cart created successfully!',
    data: newCart,
  });
});

// UPDATE Cart
const updateCart = catchAsync(async (req, res) => {
  const updatedCart = await CartService.updateCartIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully',
    data: updatedCart,
  });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CartService.getAllCategoriesFromDB();

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

// GET SINGLE Cart
const getSingleCart = catchAsync(async (req, res) => {
  const Cart = await CartService.getSingleCartFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully!',
    data: Cart,
  });
});

// DELETE Cart
const deleteCart = catchAsync(async (req, res) => {
  const deleteCart = await CartService.deleteCartFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart deleted successfully!',
    data: deleteCart,
  });
});

export const CartController = {
  createCart,
  getAllCategories,
  getSingleCart,
  updateCart,
  deleteCart,
};
