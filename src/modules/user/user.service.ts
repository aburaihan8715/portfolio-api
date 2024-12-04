import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

// REGISTER
const registerIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

export const UserService = { registerIntoDB };
