import { Schema, model, Document } from 'mongoose';

interface IPayment extends Document {
    bookingId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
}

const paymentSchema = new Schema<IPayment>({
    bookingId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Payment = model<IPayment>('Payment', paymentSchema);

export default Payment;