import { ApplicationSettings } from '@nativescript/core';

export class StorageService {
    private static readonly POSTS_KEY = 'saved_posts';
    private static readonly API_KEY = 'telegram_api_key';

    static savePosts(posts: any[]): void {
        ApplicationSettings.setString(this.POSTS_KEY, JSON.stringify(posts));
    }

    static getPosts(): any[] {
        const postsString = ApplicationSettings.getString(this.POSTS_KEY);
        return postsString ? JSON.parse(postsString) : [];
    }

    static saveApiKey(apiKey: string): void {
        ApplicationSettings.setString(this.API_KEY, apiKey);
    }

    static getApiKey(): string | null {
        return ApplicationSettings.getString(this.API_KEY);
    }
}