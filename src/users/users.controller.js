import * as usersService from './users.service';

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await usersService.createUser(userData);
    res.status(201).json({ data: result });
  } catch(err) {
    res.status(403).json({ error: err.message });
  }
};