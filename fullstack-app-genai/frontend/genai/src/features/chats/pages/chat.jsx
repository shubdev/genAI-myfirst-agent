import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../services/chat.api';
import {
    addUserMessage,
    appendAiMessageChunk,
    setLoading,
} from '../state/chat.slice';

const Chat = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { messages, isLoading } = useSelector((state) => state.chat);
    const chatContainerRef = useRef(null);

    // Auto-scroll to the bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        dispatch(addUserMessage(message));
        setMessage('');
        dispatch(setLoading(true));

        try {
            await sendMessage(message, (chunk) => {
                dispatch(appendAiMessageChunk(chunk));
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            // Optionally, dispatch an error message to the UI
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900 text-white">
            {/* Chat messages area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''
                                }`}
                        >
                            {msg.sender === 'ai' && (
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                    AI
                                </div>
                            )}
                            <div
                                className={`p-4 rounded-lg max-w-2xl ${msg.sender === 'user'
                                        ? 'bg-blue-600'
                                        : 'bg-zinc-800'
                                    }`}
                            >
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                AI
                            </div>
                            <div className="bg-zinc-800 p-4 rounded-lg">
                                <p className="animate-pulse">Typing...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Input area */}
            <div className="p-6">
                <form onSubmit={handleSendMessage} className="relative">
                    <input
                        type="text"
                        placeholder="Enter Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-800 text-white placeholder-zinc-400 px-4 py-3 pr-12 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;