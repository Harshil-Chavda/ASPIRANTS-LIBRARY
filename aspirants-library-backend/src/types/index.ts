export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'student' | 'admin';
}

export interface Booking {
    id: string;
    userId: string;
    seatId: string;
    bookingDate: Date;
    duration: number; // in hours
}

export interface Payment {
    id: string;
    userId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    paymentDate: Date;
    razorpayOrderId: string;
    razorpayPaymentId: string;
}

export interface Seat {
    id: string;
    seatNumber: string;
    isBooked: boolean;
}