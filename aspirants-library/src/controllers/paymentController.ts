import { Request, Response } from 'express';
import Payment from '../models/Payment';
import Booking from '../models/Booking';

class PaymentController {
    async createPayment(req: Request, res: Response) {
        const { bookingId, amount } = req.body;

        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            const payment = new Payment({
                bookingId,
                amount,
                status: 'Pending'
            });

            await payment.save();
            res.status(201).json(payment);
        } catch (error) {
            res.status(500).json({ message: 'Error processing payment', error });
        }
    }

    async verifyPayment(req: Request, res: Response) {
        const { paymentId } = req.params;

        try {
            const payment = await Payment.findById(paymentId);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }

            // Simulate payment verification logic
            payment.status = 'Completed';
            await payment.save();

            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ message: 'Error verifying payment', error });
        }
    }
}

export default new PaymentController();