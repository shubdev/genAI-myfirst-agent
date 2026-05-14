import { getStream } from "../service/ai.service.js"


export async function handleMessage(req, res) {
    try {
        const messageText = req.body.message;

        const messages = [
            {
                role: "user",
                content: messageText
            }
        ]

        const stream = await getStream(messages)

        res.setHeader("Content-Type", "text/event-stream")
        res.setHeader("Cache-Control", "no-cache")
        res.setHeader("Connection", "keep-alive")

        for await (const chunk of stream) {

            const aiChunk = chunk[0].contentBlocks[0].text

            res.write(`data: ${JSON.stringify({ chunk: aiChunk })}\n\n`)
        }

        res.end() //end the response when the stream is done.
    } catch (error) {
        console.error("Error in handleMessage:", error);
        res.status(500).json({ error: error.message });
    }
}
