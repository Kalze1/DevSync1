
import Chatbar from "./components/main/chatbar"
import Chat from "./components/main/chat"
import Navbar from "./components/main/navbar"
import Sidebar from "./components/main/sidebar"
import Demo from "./components/main/demo"
import KnowledgeBase from "./components/main/KnowledgeBase"
import GroupChat from "./components/main/GroupChat"
import GroupChatBar from "./components/main/GroupChatBar"
function App() {


  return (
    <>

      {/* <Navbar /> */}
      <div className="flex">

        <Sidebar />
        {/* <Chatbar /> */}
        <GroupChatBar />
        {/* <Chat /> */}
        {/* <KnowledgeBase /> */}
        <GroupChat />




      </div>
      {/* <Demo /> */}



    </>


  )
}

export default App
