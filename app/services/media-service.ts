import { ImagePicker } from '@nativescript/core';

export class MediaService {
    static async pickMedia(): Promise<string | null> {
        const context = {
            mode: 'single',
            mediaType: ImagePicker.ImagePickerMediaType.Any
        };

        try {
            const selection = await ImagePicker.create(context).present();
            return selection && selection.length > 0 ? selection[0].path : null;
        } catch (error) {
            console.error('Error picking media:', error);
            return null;
        }
    }
}