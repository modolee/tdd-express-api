import userModel from './user.model';

export const createUser = async (userData) => {
  const { name, position, roles } = userData;
  const newUser = await userModel.create({ name, position, roles });

  return newUser.toObject();
};
