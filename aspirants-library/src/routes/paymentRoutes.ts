import { Router } from 'express';
import PaymentController from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();

// Route to create a payment
router.post('/create', paymentController.createPayment);

// Route to verify a payment
router.post('/verify', paymentController.verifyPayment);

export default router;