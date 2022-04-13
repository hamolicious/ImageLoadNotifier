export class ImageRequest {
    constructor(userAgent, timestamp) {
        this.timestamp = timestamp || new Date().getTime();
        this.userAgent = userAgent;
    }
}