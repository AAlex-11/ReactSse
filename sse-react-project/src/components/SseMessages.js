import React, { useState, useEffect } from 'react';
import { SseService } from '../../src/services/sseService';

const SseMessages = () => {
    const [message, setMessage] = useState(null);
    const sseService = new SseService();

    useEffect(() => {
        // Connect to the SSE endpoint
        sseService.connect('http://localhost:3000/sse', (event) => {
            const data = JSON.parse(event.data);
            setMessage(`${data.body} <br> Timestamp: ${event.timeStamp}`);
        }, (error) => {
            console.error('SSE error:', error);
        });

        // Cleanup on component unmount
        return () => {
            sseService.disconnect();
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <h1>SSE Messages</h1>
            <div dangerouslySetInnerHTML={{ __html: message || 'Waiting for messages...' }} />
        </div>
    );
};

export default SseMessages;