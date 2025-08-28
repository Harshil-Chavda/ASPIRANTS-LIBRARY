import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    seatId: mongoose.Types.ObjectId;
    bookingDate: Date;
    duration: number; // Duration in hours
    status: string; // e.g., 'confirmed', 'cancelled'
}

const BookingSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    seatId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Seat'
    },
    bookingDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    }
});

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;