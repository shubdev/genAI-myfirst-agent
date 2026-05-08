import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: true,
        },
        sender: {
            type: String,
            enum: ['user', 'ai'],
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        model: {
            type: String,
            enum: ['mistral', 'openai', 'gemini'],
            default: 'mistral',
        },
        isAI: {
            type: Boolean,
            default: false,
        },
        metadata: {
            tokens: Number,
            responseTime: Number,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
