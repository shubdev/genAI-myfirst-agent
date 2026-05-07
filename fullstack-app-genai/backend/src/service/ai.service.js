import { ChatOpenAI } from "@langchain/openai";
import { ChatMistralAI } from "@langchain/mistralai"
import { createAgent } from "langchain"
import config from "../config/config.js"

// const model = new ChatOpenAI({
//     model: "gpt-4",
//     apiKey: process.env.OPENAI_API_KEY,
// });

const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: config.MISTRAL_API_KEY,
})

const agent = createAgent({
    model,
    tools: [],
})

export async function generateResponse(messages) {
    const response = await model.invoke(messages)
    return response.content
}

export async function getStream(messages) {
    const stream = await agent.stream({
        messages
    },
        {
            streamMode: "messages"
        }
    )

    return stream
}