import { Observable } from '@nativescript/core';
import { TelegramService } from '../../services/telegram-service';
import { navigate } from '../../utils/navigation';

export class LoginViewModel extends Observable {
    private phoneNumber: string = '';
    private isLoading: boolean = false;

    constructor() {
        super();
    }

    async onLoginTap() {
        if (!this.phoneNumber) {
            // TODO: Show error message
            return;
        }

        this.set('isLoading', true);

        try {
            const success = await TelegramService.getInstance().login(this.phoneNumber);
            if (success) {
                navigate('views/posts/posts-page');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // TODO: Show error message
        } finally {
            this.set('isLoading', false);
        }
    }

    get phoneNumber(): string {
        return this.phoneNumber;
    }

    set phoneNumber(value: string) {
        if (this.phoneNumber !== value) {
            this.phoneNumber = value;
            this.notifyPropertyChange('phoneNumber', value);
        }
    }
}