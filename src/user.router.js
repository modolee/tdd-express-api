import { Router } from 'express';
import validate from './middlewares';
import * as userController from './user.controller';
import userValidation from './user.validation';
const router = Router();

router.post('/', validate(userValidation), userController.createUser);

export default router;