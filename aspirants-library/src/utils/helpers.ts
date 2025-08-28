export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

export function calculateBookingDuration(start: Date, end: Date): number {
    const duration = end.getTime() - start.getTime();
    return Math.ceil(duration / (1000 * 60)); // duration in minutes
}