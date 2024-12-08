import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import { PaymentService } from './payment.service';

// CREATE Payment
const createPayment = catchAsync(async (req, res) => {
  const newPayment = await PaymentService.createPaymentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment created successfully!',
    data: newPayment,
  });
});

// UPDATE Payment
const updatePayment = catchAsync(async (req, res) => {
  const updatedPayment = await PaymentService.updatePaymentIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment updated successfully',
    data: updatedPayment,
  });
});

// GET ALL CATEGORIES
const getAllCategories = catchAsync(async (req, res) => {
  const categories = await PaymentService.getAllCategoriesFromDB();

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

// GET SINGLE Payment
const getSinglePayment = catchAsync(async (req, res) => {
  const Payment = await PaymentService.getSinglePaymentFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment retrieved successfully!',
    data: Payment,
  });
});

// DELETE Payment
const deletePayment = catchAsync(async (req, res) => {
  const deletePayment = await PaymentService.deletePaymentFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment deleted successfully!',
    data: deletePayment,
  });
});

export const PaymentController = {
  createPayment,
  getAllCategories,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
