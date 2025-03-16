export class SseService {
    constructor() {
        this.eventSource = null;
    }

    // Connect to the SSE endpoint
    connect(url, onMessage, onError) {
        this.eventSource = new EventSource(url);

        // Handle incoming messages
        this.eventSource.onmessage = (event) => {
            if (onMessage) onMessage(event);
        };

        // Handle errors
        this.eventSource.onerror = (error) => {
            if (onError) onError(error);
        };
    }

    // Disconnect from the SSE endpoint
    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }
}