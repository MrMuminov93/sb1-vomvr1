import { alert, AlertOptions } from '@nativescript/core';

export async function showError(message: string): Promise<void> {
    const options: AlertOptions = {
        title: 'Error',
        message,
        okButtonText: 'OK'
    };
    return alert(options);
}

export async function showSuccess(message: string): Promise<void> {
    const options: AlertOptions = {
        title: 'Success',
        message,
        okButtonText: 'OK'
    };
    return alert(options);
}