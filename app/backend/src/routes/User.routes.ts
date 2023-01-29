import * as express from 'express';

import LoginController from '../controllers/User.controller';
import LoginValidation from '../middlewares/loginValidation';

const loginValidationMiddleware = new LoginValidation();
const loginController = new LoginController();

const router = express.Router();

router.post(
  '/',
  loginValidationMiddleware.validateUser,
  loginValidationMiddleware.validateFields,
  loginController.login,
);

router.get(
  '/validate',
  loginValidationMiddleware.validateToken,
  loginController.getUserRole,
);

export default router;
