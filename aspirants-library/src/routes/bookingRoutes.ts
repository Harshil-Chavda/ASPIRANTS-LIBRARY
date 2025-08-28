import { Router } from 'express';
import BookingController from '../controllers/bookingController';

const router = Router();
const bookingController = new BookingController();

// Route to create a new booking
router.post('/book', bookingController.createBooking);

// Route to update an existing booking
router.put('/book/:id', bookingController.updateBooking);

// Route to delete a booking
router.delete('/book/:id', bookingController.deleteBooking);

// Route to get all bookings for a user
router.get('/user/:userId/bookings', bookingController.getUserBookings);

export default router;