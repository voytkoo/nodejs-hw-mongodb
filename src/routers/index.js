import { Router } from 'express';
import authRouter from './auth';
import contactsRouter from './contacts';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
