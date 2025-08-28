Sure, here's the contents for the file: /aspirants-library-backend/src/routes/seats.ts

import { Router } from 'express';
import { bookSeat, getAvailableSeats } from '../controllers/seatController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Route to get available seats
router.get('/available', authenticate, getAvailableSeats);

// Route to book a seat
router.post('/book', authenticate, bookSeat);

export default router;