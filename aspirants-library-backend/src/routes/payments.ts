Sure, here's the contents for the file `/aspirants-library-backend/src/routes/payments.ts`:

import express from 'express';
import { createPaymentOrder, savePaymentDetails, getUserPayments } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Route to create a payment order
router.post('/create-order', authenticate, createPaymentOrder);

// Route to save payment details
router.post('/save', authenticate, savePaymentDetails);

// Route to get user payments
router.get('/user-payments', authenticate, getUserPayments);

export default router;