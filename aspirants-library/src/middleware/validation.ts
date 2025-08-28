import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateUserRegistration = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateUserLogin = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validateBooking = [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('seatId').notEmpty().withMessage('Seat ID is required'),
    body('bookingTime').isISO8601().withMessage('Booking time must be a valid date'),
];

const validatePayment = [
    body('bookingId').notEmpty().withMessage('Booking ID is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
];

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export {
    validateUserRegistration,
    validateUserLogin,
    validateBooking,
    validatePayment,
    validateRequest,
};