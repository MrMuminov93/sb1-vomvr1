import { Observable, ObservableArray } from '@nativescript/core';
import { navigate } from '../../utils/navigation';
import { Post } from '../../models/post';
import { StorageService } from '../../services/storage-service';
import { showError } from '../../utils/alert';

export class PostsViewModel extends Observable {
    private _posts: ObservableArray<Post>;
    private _isLoading: boolean = false;

    constructor() {
        super();
        this._posts = new ObservableArray<Post>();
        this.loadPosts();
    }

    get posts(): ObservableArray<Post> {
        return this._posts;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onNewPost() {
        navigate('views/posts/create-post-page');
    }

    onSettingsTap() {
        navigate('views/settings/settings-page');
    }

    private async loadPosts() {
        this._isLoading = true;
        this.notifyPropertyChange('isLoading', true);

        try {
            const savedPosts = StorageService.getPosts();
            this._posts.splice(0);
            savedPosts.forEach(post => {
                this._posts.push(new Post(
                    post.text,
                    post.status,
                    post.scheduledTime ? new Date(post.scheduledTime) : undefined,
                    post.mediaPath
                ));
            });
        } catch (error) {
            await showError('Failed to load posts');
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }
}