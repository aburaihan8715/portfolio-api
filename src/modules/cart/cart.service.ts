import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

const createCartIntoDB = async (userId: string, payload: ICart) => {
  const cartData = { user: userId, items: payload.items };

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create(cartData);
  } else {
    cart.items.push(...payload.items);
    await cart.save();
  }

  return cart;
};

// const createCartIntoDB = async (userId: string, payload: ICart) => {
//   // Update or create the cart
//   const cart = await Cart.findOneAndUpdate(
//     { user: userId },
//     { $addToSet: { items: { $each: payload.items } } },
//     { new: true, upsert: true },
//   ).populate('items.product'); // Populate product to access its price

//   if (!cart) {
//     throw new Error('Failed to create or update the cart');
//   }

//   // Calculate totalItems and totalAmount
//   cart.totalItems = cart.items.reduce(
//     (total, item) => total + item.quantity,
//     0,
//   );

//   cart.totalAmount = cart.items.reduce((total, item) => {
//     const productPrice = (item.product as any).price || 0; // Access the product's price
//     return total + productPrice * item.quantity;
//   }, 0);

//   await cart.save(); // Save the cart with the updated values

//   return cart;
// };

const getCartsFromDB = async (userId: string) => {
  const result = await Cart.find({ user: userId });

  return result;
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
  getCartsFromDB,
  deleteCartFromDB,
};
