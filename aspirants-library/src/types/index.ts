export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Admin {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Booking {
    id: string;
    userId: string;
    seatId: string;
    bookingTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Payment {
    id: string;
    bookingId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}