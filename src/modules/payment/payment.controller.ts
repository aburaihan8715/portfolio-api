import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

// CREATE
const createPaymentIntent = catchAsync(async (req, res) => {
  const result = await PaymentService.createPaymentIntent(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent created successfully !',
    data: result,
  });
});

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createPaymentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment created successfully !',
    data: result,
  });
});

export const PaymentController = {
  createPaymentIntent,
  createPayment,
};
