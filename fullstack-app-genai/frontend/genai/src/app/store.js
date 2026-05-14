import { configureStore } from '@reduxjs/toolkit'
import { addUserMessage, addAiMessage, appendAiMessageChunk, setLoading, clearChat } from '../features/chats/state/chat.slice.js';

export const store = configureStore({
    reducer: {
        addUserMessage: addUserMessage,
        addAiMessage: addAiMessage,
        appendAiMessageChunk: appendAiMessageChunk,
        setLoading: setLoading,
        clearChat: clearChat,
    },
})