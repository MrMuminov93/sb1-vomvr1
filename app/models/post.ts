export class Post {
    constructor(
        public text: string,
        public status: 'draft' | 'scheduled' | 'sent' | 'failed' = 'draft',
        public scheduledTime?: Date,
        public mediaPath?: string
    ) {}

    get formattedScheduledTime(): string {
        return this.scheduledTime ? this.scheduledTime.toLocaleString() : '';
    }
}