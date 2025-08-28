Sure, here's the contents for the file: /aspirants-library-backend/src/models/Seat.ts

import { Schema, model } from 'mongoose';

const seatSchema = new Schema({
    seatNumber: {
        type: String,
        required: true,
        unique: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    bookingDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Seat = model('Seat', seatSchema);

export default Seat;