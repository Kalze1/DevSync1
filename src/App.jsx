
import Chatbar from "./components/main/chatbar"
import Chat from "./components/main/chat"
import Navbar from "./components/main/navbar"
import Sidebar from "./components/main/sidebar"
import profile from "./components/main/profile"
import avatar from "./components/main/avatar"
import Chattop from "./components/main/chattop"
import DynamicQuiz from "./components/main/quiz"
import QuizComponent from "./components/main/page"

function App() {


  return (
    <>

      {/* <Navbar /> */}
      <div className="flex">
        
        <Sidebar />
        <DynamicQuiz />
        {/* <QuizComponent /> */}
        

      </div>
     



    </>


  )
}

export default App
