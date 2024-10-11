import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
