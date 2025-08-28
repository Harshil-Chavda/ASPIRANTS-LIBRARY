Sure, here's the contents for the file `/aspirants-library/aspirants-library/src/routes/userRoutes.ts`:

import { Router } from 'express';
import UserController from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticate, userController.getProfile);

export default router;