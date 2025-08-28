Sure, here's the contents for the file: /aspirants-library-backend/src/models/Payment.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IPayment extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    paymentId: string;
    status: string;
    createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;