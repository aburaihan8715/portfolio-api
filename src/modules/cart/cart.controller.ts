import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartService } from './cart.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';

const createCart = catchAsync(async (req, res) => {
  const newCart = await CartService.createCartIntoDB(
    req.user._id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cart created successfully!',
    data: newCart,
  });
});

// UPDATE Cart

// GET ALL CATEGORIES
const getCarts = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const carts = await CartService.getCartsFromDB(userId);

  if (!carts || carts.length < 1) {
    return sendNotFoundDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Carts retrieved successfully!',
    data: carts,
  });
});

// DELETE Cart
// const deleteCart = catchAsync(async (req, res) => {
//   const deleteCart = await CartService.deleteCartFromDB(req.params.id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cart deleted successfully!',
//     data: deleteCart,
//   });
// });

export const CartController = {
  createCart,
  getCarts,
};
