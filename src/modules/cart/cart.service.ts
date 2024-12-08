import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

// CREATE Cart
const createCartIntoDB = async (payload: ICart) => {
  const result = await Cart.create(payload);
  return result;
};

const updateCartIntoDB = async (id: string, payload: Partial<ICart>) => {
  const updatedCart = await Cart.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedCart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart could not be updated!');
  }

  // delete password form the user
  const { __v, ...remainingCart } = updatedCart.toObject();

  // return tokens and user to the controller
  return remainingCart;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Cart.find({});

  return categories;
};

const getSingleCartFromDB = async (id: string) => {
  const cart = await Cart.findById(id);

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found !');
  }

  return Cart;
};

const deleteCartFromDB = async (id: string) => {
  const deletedCart = await Cart.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedCart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found !');
  }

  return deletedCart;
};

export const CartService = {
  createCartIntoDB,
  updateCartIntoDB,
  getAllCategoriesFromDB,
  getSingleCartFromDB,
  deleteCartFromDB,
};
