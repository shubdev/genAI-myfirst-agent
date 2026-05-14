export async function sendMessage(message, onChunk = (chunk) => { }) {
    const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    console.log("Response from backend:", response);

    const decoder = new TextDecoder();

    for await (const chunk of response.body) {
        const text = decoder.decode(chunk);
        const lines = text.split("\n\n")
        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const json = line.replace("data: ", "") // data hame string formate me mil raha hay so hum data key ko hata rahe hay or convert kar rahe hay json formate me.
                const data = JSON.parse(json)
                onChunk(data)
                console.log(data);
            }

        }
    }
}
/**
 * here we use fetch becouse we want to handle the stream of data coming from the backend. We can't use axios for this because it doesn't support streaming responses out of the box.
 * in this compnontn e call the sendMessage function which sends a POST request to the backend with the message. The backend then processes the message and sends back a stream of data. We use a TextDecoder to decode the stream of data and log it to the console.
 * 
 *
 */