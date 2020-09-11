import userModel from './user.model';

export const createUser = async (userData) => {
  const { name, position, roles } = userData;

  const existedUser = await userModel.findOne({ name });

  if(existedUser) {
    throw new Error(`User '${name}' already exists`)
  } else {
    const newUser = await userModel.create({name, position, roles});
    return newUser.toObject();
  }
};
