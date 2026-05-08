import { useState } from 'react'
import { sendMessage } from '../features/chats/services/chat.api'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  const handleSendMessage = async () => {
    await sendMessage(message)
  }

  return (
    <><h1>Chat GPT</h1>
      <input
        type="text"
        placeholder='Enter Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </>
  )
}

export default App

/**
 * flow - 
 * 
 * fe - install react router and redux toolkit to and run docker compose up
 *  * create slice -
 * create reducers -- 
 * create action - * =dispatch the  action and add it to the reducers component 
 * create component usehook - * = use the action and the reducer in the component to display the data. 
 * 
 */