import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Shop } from './shop.model';
import { IShop } from './shop.interface';
import { IFile } from '../../interface/file.interface';

const createShopIntoDB = async (file: IFile, payload: IShop) => {
  if (file && file.path) {
    payload.logo = file.path;
  }
  const result = await Shop.create(payload);

  return result;
};

const updateShopIntoDB = async (
  shopId: string,
  vendorId: string,
  file: IFile,
  payload: Pick<IShop, 'name' | 'logo' | 'description'>,
) => {
  if (file && file.path) {
    payload.logo = file.path;
  }

  const updatedShop = await Shop.findOneAndUpdate(
    { _id: shopId, vendorId },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedShop) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Shop not found or does not match the vendor!',
    );
  }

  return updatedShop;
};

const getAllShopsFromDB = async () => {
  const shops = await Shop.find({});

  return shops;
};

const getSingleShopFromDB = async (id: string) => {
  const shop = await Shop.findById(id);

  if (!shop) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shop not found !');
  }

  return shop;
};

const deleteShopFromDB = async (
  shopId: string,
  userId: string,
  role: string,
) => {
  // Check if shop exists
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shop not found!');
  }

  // Authorization check
  const isAuthorized =
    role === 'admin' ||
    role === 'superAdmin' ||
    (role === 'vendor' && shop.vendorId.toString() === userId);

  if (!isAuthorized) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this shop!',
    );
  }

  // Mark shop as deleted
  const updatedShop = await Shop.findByIdAndUpdate(
    shopId,
    { isDeleted: true },
    { new: true },
  );

  if (!updatedShop) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete the shop!',
    );
  }

  return updatedShop;
};

export const ShopService = {
  createShopIntoDB,
  updateShopIntoDB,
  getAllShopsFromDB,
  getSingleShopFromDB,
  deleteShopFromDB,
};
