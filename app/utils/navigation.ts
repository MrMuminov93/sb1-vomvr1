import { Frame } from '@nativescript/core';

export function navigate(page: string, context?: any) {
    const frame = Frame.topmost();
    frame.navigate({
        moduleName: page,
        context: context,
        clearHistory: true
    });
}