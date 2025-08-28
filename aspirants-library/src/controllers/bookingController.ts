import { Request, Response } from 'express';
import Booking from '../models/Booking';

class BookingController {
    async createBooking(req: Request, res: Response) {
        try {
            const { userId, seatId, bookingTime } = req.body;
            const newBooking = new Booking({ userId, seatId, bookingTime });
            await newBooking.save();
            res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
        } catch (error) {
            res.status(500).json({ message: 'Error creating booking', error });
        }
    }

    async updateBooking(req: Request, res: Response) {
        try {
            const { bookingId } = req.params;
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, { new: true });
            if (!updatedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
        } catch (error) {
            res.status(500).json({ message: 'Error updating booking', error });
        }
    }

    async deleteBooking(req: Request, res: Response) {
        try {
            const { bookingId } = req.params;
            const deletedBooking = await Booking.findByIdAndDelete(bookingId);
            if (!deletedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.status(200).json({ message: 'Booking deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting booking', error });
        }
    }

    async getBookings(req: Request, res: Response) {
        try {
            const bookings = await Booking.find();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving bookings', error });
        }
    }
}

export default new BookingController();