
import Chatbar from "./components/main/chatbar"
import Chat from "./components/main/chat"
import Navbar from "./components/main/navbar"
import Sidebar from "./components/main/sidebar"
function App() {


  return (
    <>

      {/* <Navbar /> */}
      <div className="flex">

        <Sidebar />
        <Chatbar />
        <Chat />



      </div>



    </>


  )
}

export default App
