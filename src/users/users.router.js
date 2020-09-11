import { Router } from 'express';
import validate from '../middlewares';
import * as userController from './users.controller';
import userValidation from './users.validation';
const router = Router();

router.post('/', validate(userValidation), userController.createUser);

export default router;