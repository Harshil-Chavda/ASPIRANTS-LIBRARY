import { Schema, model, Document } from 'mongoose';

interface IBooking extends Document {
    userId: string;
    seatId: string;
    bookingTime: Date;
}

const bookingSchema = new Schema<IBooking>({
    userId: { type: String, required: true },
    seatId: { type: String, required: true },
    bookingTime: { type: Date, default: Date.now }
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;