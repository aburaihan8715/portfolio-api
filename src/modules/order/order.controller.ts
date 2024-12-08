import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import { OrderService } from './order.service';

// CREATE Order
const createOrder = catchAsync(async (req, res) => {
  const newOrder = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully!',
    data: newOrder,
  });
});

// UPDATE Order
const updateOrder = catchAsync(async (req, res) => {
  const updatedOrder = await OrderService.updateOrderIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: updatedOrder,
  });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
  const categories = await OrderService.getAllCategoriesFromDB();

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

// GET SINGLE Order
const getSingleOrder = catchAsync(async (req, res) => {
  const Order = await OrderService.getSingleOrderFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully!',
    data: Order,
  });
});

// DELETE Order
const deleteOrder = catchAsync(async (req, res) => {
  const deleteOrder = await OrderService.deleteOrderFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully!',
    data: deleteOrder,
  });
});

export const OrderController = {
  createOrder,
  getAllCategories,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
