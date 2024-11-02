import { Application } from '@nativescript/core';
import { initTelegramAPI } from './services/telegram-service';

// Initialize Telegram API
initTelegramAPI();

Application.run({ moduleName: 'app-root' });