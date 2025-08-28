Sure, here's the contents for the file: /aspirants-library-backend/src/controllers/paymentController.ts

import { Request, Response, NextFunction } from 'express';
import Razorpay from 'razorpay';
import Payment from '../models/Payment';
import { authenticate } from '../middleware/auth';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a payment order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in paise
            currency,
            receipt: `receipt_${Math.random()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

// Save payment details
export const savePaymentDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId, paymentId, signature } = req.body;

    try {
        const payment = new Payment({
            orderId,
            paymentId,
            signature,
        });

        await payment.save();
        res.status(201).json({ message: 'Payment details saved successfully' });
    } catch (error) {
        next(error);
    }
};

// Retrieve user payments
export const getUserPayments = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    try {
        const payments = await Payment.find({ userId });
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

// Middleware for authentication
export const authenticateUser = authenticate;