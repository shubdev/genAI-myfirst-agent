import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    isLoading: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addUserMessage: (state, action) => {
            state.messages.push({
                sender: 'user',
                text: action.payload,
            });
        },
        addAiMessage: (state, action) => {
            state.messages.push({
                sender: 'ai',
                text: action.payload,
            });
        },
        appendAiMessageChunk: (state, action) => {
            const lastMessage = state.messages[state.messages.length - 1];
            if (lastMessage && lastMessage.sender === 'ai') {
                lastMessage.text += action.payload;
            } else {
                // If the last message isn't from the AI, create a new one
                state.messages.push({
                    sender: 'ai',
                    text: action.payload,
                });
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearChat: (state) => {
            state.messages = [];
        },
    },
});

export const {
    addUserMessage,
    addAiMessage,
    appendAiMessageChunk,
    setLoading,
    clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;