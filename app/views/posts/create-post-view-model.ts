import { Observable } from '@nativescript/core';
import { TelegramService } from '../../services/telegram-service';
import { MediaService } from '../../services/media-service';
import { DateTimeService } from '../../services/datetime-service';

export class CreatePostViewModel extends Observable {
    private _postText: string = '';
    private _mediaPath: string = '';
    private _scheduledTime: Date | null = null;

    constructor() {
        super();
    }

    get postText(): string {
        return this._postText;
    }

    set postText(value: string) {
        if (this._postText !== value) {
            this._postText = value;
            this.notifyPropertyChange('postText', value);
        }
    }

    get hasMedia(): boolean {
        return !!this._mediaPath;
    }

    get isScheduled(): boolean {
        return !!this._scheduledTime;
    }

    get scheduledTime(): string {
        return this._scheduledTime ? this._scheduledTime.toLocaleString() : '';
    }

    async onAddMedia() {
        try {
            const mediaPath = await MediaService.pickMedia();
            if (mediaPath) {
                this._mediaPath = mediaPath;
                this.notifyPropertyChange('hasMedia', true);
                this.notifyPropertyChange('mediaPath', mediaPath);
            }
        } catch (error) {
            console.error('Error picking media:', error);
        }
    }

    async onSchedule() {
        try {
            const date = await DateTimeService.showDateTimePicker();
            if (date) {
                this._scheduledTime = date;
                this.notifyPropertyChange('isScheduled', true);
                this.notifyPropertyChange('scheduledTime', this.scheduledTime);
            }
        } catch (error) {
            console.error('Error scheduling post:', error);
        }
    }

    async onSendPost() {
        try {
            await TelegramService.getInstance().sendPost(
                this._postText,
                this._scheduledTime
            );
            // Navigate back to posts list
            const frame = Frame.topmost();
            frame.goBack();
        } catch (error) {
            console.error('Error sending post:', error);
        }
    }
}