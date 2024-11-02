import { DateTimePicker } from '@nativescript/core';

export class DateTimeService {
    static async showDateTimePicker(): Promise<Date | null> {
        try {
            const date = await DateTimePicker.pickDate({
                title: 'Select Date',
                theme: 'light',
                minDate: new Date(),
                maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
            });

            if (date) {
                const time = await DateTimePicker.pickTime({
                    title: 'Select Time',
                    theme: 'light'
                });

                if (time) {
                    date.setHours(time.getHours());
                    date.setMinutes(time.getMinutes());
                    return date;
                }
            }
            return null;
        } catch (error) {
            console.error('Error picking date/time:', error);
            return null;
        }
    }
}