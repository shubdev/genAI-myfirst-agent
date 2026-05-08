import { getStream } from "../service/ai.service.js"


export async function handleMessage(req, res) {

    console.log("Received message:", req.body);
    const message = req.body.message;

    message = [
        {
            role: "user",
            content: message
        }
    ]

    const stream = await getStream(messages)

    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    for await (const chunk of stream) {

        const aiChunk = chunk[0].content

        res.write(`data: ${JSON.stringify({ chunk: aiChunk })}\n\n`)
    }

    res.end() //end the response when the stream is done.

}
