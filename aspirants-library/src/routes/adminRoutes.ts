import { Router } from 'express';
import AdminController from '../controllers/adminController';
import { authenticate } from '../middleware/auth';

const router = Router();
const adminController = new AdminController();

// Admin routes
router.get('/users', authenticate, adminController.getAllUsers);
router.delete('/users/:id', authenticate, adminController.deleteUser);
router.get('/analytics', authenticate, adminController.viewAnalytics);

export default router;