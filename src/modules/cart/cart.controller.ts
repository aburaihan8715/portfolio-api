import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartService } from './cart.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';

const addCart = catchAsync(async (req, res) => {
  const newCart = await CartService.addCartIntoDB(req.user._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cart created successfully!',
    data: newCart,
  });
});

const getCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const carts = await CartService.getCartFromDB(userId);

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

const incrementQuantity = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params; // Assuming productId is passed in params

  const updatedCart = await CartService.incrementQuantityIntoDB(
    userId,
    productId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product quantity incremented successfully!',
    data: updatedCart,
  });
});

const decrementQuantity = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const updatedCart = await CartService.decrementQuantityIntoDB(
    userId,
    productId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product quantity decremented successfully!',
    data: updatedCart,
  });
});

const removeCartItem = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  const updatedCart = await CartService.removeCartItemFromDB(
    productId,
    userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item removed successfully!',
    data: updatedCart,
  });
});

const clearCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const cartId = req.params.id; // Assume cartId comes from params
  const deletedCart = await CartService.clearCartFromDB(cartId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart deleted successfully!',
    data: deletedCart,
  });
});

export const CartController = {
  addCart,
  getCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  removeCartItem,
};
