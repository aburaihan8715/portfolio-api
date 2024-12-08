import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IOrder } from './order.interface';
import { Order } from './order.model';

// CREATE Order
const createOrderIntoDB = async (payload: IOrder) => {
  const result = await Order.create(payload);
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<IOrder>) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedOrder) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Order could not be updated!',
    );
  }

  // delete password form the user
  const { __v, ...remainingOrder } = updatedOrder.toObject();

  // return tokens and user to the controller
  return remainingOrder;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Order.find({});

  return categories;
};

const getSingleOrderFromDB = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found !');
  }

  return Order;
};

const deleteOrderFromDB = async (id: string) => {
  const deletedOrder = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedOrder) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found !');
  }

  return deletedOrder;
};

export const OrderService = {
  createOrderIntoDB,
  updateOrderIntoDB,
  getAllCategoriesFromDB,
  getSingleOrderFromDB,
  deleteOrderFromDB,
};
