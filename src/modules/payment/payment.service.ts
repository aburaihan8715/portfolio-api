import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IPayment } from './payment.interface';
import { Payment } from './payment.model';

// CREATE Payment
const createPaymentIntoDB = async (payload: IPayment) => {
  const result = await Payment.create(payload);
  return result;
};

const updatePaymentIntoDB = async (
  id: string,
  payload: Partial<IPayment>,
) => {
  const updatedPayment = await Payment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedPayment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Payment could not be updated!',
    );
  }

  // delete password form the user
  const { __v, ...remainingPayment } = updatedPayment.toObject();

  // return tokens and user to the controller
  return remainingPayment;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Payment.find({});

  return categories;
};

const getSinglePaymentFromDB = async (id: string) => {
  const payment = await Payment.findById(id);

  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found !');
  }

  return Payment;
};

const deletePaymentFromDB = async (id: string) => {
  const deletedPayment = await Payment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedPayment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found !');
  }

  return deletedPayment;
};

export const PaymentService = {
  createPaymentIntoDB,
  updatePaymentIntoDB,
  getAllCategoriesFromDB,
  getSinglePaymentFromDB,
  deletePaymentFromDB,
};
