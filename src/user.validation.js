import { body } from 'express-validator';

const validation = [
  body('name').notEmpty(),
  body('position').notEmpty(),
  body('roles').notEmpty()
];

export default validation;