
import { useState, useEffect } from "react"


import "./App.css"
import Chatbar from "./components/main/chatbar"
import Chat from "./components/main/chat"
// import Navbar from "./components/main/navbar"
import Sidebar from "./components/main/sidebar"
import Demo from "./components/main/demo"
import KnowledgeBase from "./components/main/KnowledgeBase"
import GroupChat from "./components/main/GroupChat"
import GroupChatBar from "./components/main/GroupChatBar"
import { RecentMessageContext } from "./contexts/RecentMessageContext"
import Profile from "./components/main/Profile"
import ChatAse from "./components/main/ChatAse"
import ChatE from "./components/main/ChatE"
import { ChatEngine, ChatEngineWrapper, Socket, ChatFeed, ChatSettings, ChatList } from "react-chat-engine"
import { PrettyChatWindow } from "react-chat-engine-pretty"
import AuthPage from "./components/main/AuthPage";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow, getOrCreateChat, } from "react-chat-engine-advanced"

import Sign_Up from "./components/main/Sign_Up"
import Login from "./components/main/Login"
// import FullTemplate from "./components/main/FullTemplate"
import Navbar from "./components/navs/Navbar"
import ChatPretty from "./components/main/ChatPretty"
import FullChatEngine from "./components/main/FullChatEngine"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import DirectChatList from "./components/main/DirectChatList"
import DirectChatList from "./components/main/DirectChatList"
// import ChatCard from "./components/ChatsPage/ChatCard"
import MemberList from "./components/main/MemberList"
import AudioChat from "./components/main/AudioChat"
import CustomChatHeader from "./components/main/CustomChatHeader"
import Chattop from "./components/navs/chattop"
import DirectChat from "./components/main/DirectChat"
import AudioCall from "./components/ChatsPage/AudioCall"
import GroupChatTop from './components/navs/GroupChatTop'

import CurrentUser from './components/main/CurrentUser'

function App() {

  const [recentMessage, setRecentMessage] = useState("recent message")
  const [messageTime, setMessageTime] = useState(null)
  const [user, setUser] = useState(undefined);

  const [chats, setChats] = useState([]);


  const projectId = import.meta.env.VITE_PROJECT_ID;
  const username = "DagiB";
  const secret = "Dagi1234";


  const chatProps = useMultiChatLogic(projectId, username, secret);



  return (<>

    <Router>

      <MultiChatSocket {...chatProps} />

      <div className="flex" style={{ height: '100vh', fontFamily: "sans-serif" }}>

        <Sidebar style={{ minWidth: '200px' }} />
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/chats" element={
            <MultiChatWindow  {...chatProps}
              style={{ height: '100vh', flexGrow: 1 }}
              renderChatHeader={() => <GroupChatTop chat={chatProps.chat} />}



            />

            // <FullChatEngine />
          } />
          <Route path="/groups" element={
            <MultiChatWindow
              chats={chatProps.chats}
              messages={chatProps.messages}
              activeChatId={chatProps.activeChatId}
              username={chatProps.username}
              peopleToInvite={chatProps.peopleToInvite}
              hasMoreChats={chatProps.hasMoreChats}
              hasMoreMessages={chatProps.hasMoreMessages}
              onChatFormSubmit={chatProps.onChatFormSubmit}
              onChatCardClick={chatProps.onChatCardClick}
              onChatLoaderShow={chatProps.onChatLoaderShow}
              onMessageLoaderShow={chatProps.onMessageLoaderShow}
              onMessageLoaderHide={chatProps.onMessageLoaderHide}
              onBottomMessageShow={chatProps.onBottomMessageShow}
              onBottomMessageHide={chatProps.onBottomMessageHide}
              onMessageFormSubmit={chatProps.onMessageFormSubmit}
              onInvitePersonClick={chatProps.onInvitePersonClick}
              onRemovePersonClick={chatProps.onRemovePersonClick}
              onDeleteChatClick={chatProps.onDeleteChatClick}
              style={{ height: '100vh', flexGrow: 1 }}
              renderChatList={() => <DirectChat />}



            />

          } />



          <Route path="/Knowledge-base" element={<KnowledgeBase />} />
          <Route path="/my-profile" element={<CurrentUser />} />

        </Routes>


      </div>

    </Router>

    <Sign_Up />

    {/* <AudioChat /> */}

    <AudioCall />
    {/* <Login /> */}



  </>)

}





export default App
