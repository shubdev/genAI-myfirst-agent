import SideBar from '../features/chats/components/SideBar'
import Chat from '../features/chats/pages/chat'
import './App.css'

function App() {
  return (
    <>
      <div className="flex h-screen w-screen bg-zinc-900 text-white">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <Chat />
        </div>
      </div>
    </>
  );
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