import { Observable } from '@nativescript/core';
import { StorageService } from '../../services/storage-service';
import { showSuccess, showError } from '../../utils/alert';

export class SettingsViewModel extends Observable {
    private _apiKey: string = '';

    constructor() {
        super();
        this._apiKey = StorageService.getApiKey() || '';
    }

    get apiKey(): string {
        return this._apiKey;
    }

    set apiKey(value: string) {
        if (this._apiKey !== value) {
            this._apiKey = value;
            this.notifyPropertyChange('apiKey', value);
        }
    }

    async onSaveSettings() {
        try {
            StorageService.saveApiKey(this._apiKey);
            await showSuccess('Settings saved successfully');
        } catch (error) {
            await showError('Failed to save settings');
        }
    }

    async onClearData() {
        try {
            StorageService.savePosts([]);
            await showSuccess('All data cleared successfully');
        } catch (error) {
            await showError('Failed to clear data');
        }
    }
}