
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
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow, } from "react-chat-engine-advanced"

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
import axios from 'axios'
import CurrentUser from './components/main/CurrentUser'

function App() {

  const [recentMessage, setRecentMessage] = useState("recent message")
  const [messageTime, setMessageTime] = useState(null)
  const [user, setUser] = useState();

  const [chats, setChats] = useState([]);

  const [fetchedChats, setFetchedChats] = useState([]);
  const [Dms, setDms] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          'https://api.chatengine.io/chats/',
          {
            headers: {
              'Project-ID': import.meta.env.VITE_PROJECT_ID,
              'User-Name': 'abela',
              'User-Secret': '@Abel1234'
            },
          }
        );

        console.log('Chats fetched successfully(for DM):', response.data);
        setFetchedChats(response.data);

        const directMessages = response.data.filter(chat => chat.is_direct_chat);
        console.log(directMessages);
        setDms(directMessages);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);



  const projectId = import.meta.env.VITE_PROJECT_ID;




  const chatProps = useMultiChatLogic(projectId, user?.username, user?.password);
  const handleLoginSuccess = (userData) => {
    // setUser(userData);
    console.log("userData")
    useState(userData)
    console.log(userData)
    setCredentials({ username: userData.username, password: userData.password }); // Update credentials after login
  };

  useEffect(() => {
    console.log('user', user);

    console.log(chatProps)
  }, [user])



  if (!user) {

    return <Router>
      <Routes>
        <Route path="/" element={<Login onAuth={(user) => setUser(user)} />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/old" element={<Chat />} />

      </Routes>
    </Router>

  }

  else {
    return <Router>

      <MultiChatSocket {...chatProps} />

      <div className="flex" style={{ height: '100vh', fontFamily: "sans-serif" }}>

        <Sidebar style={{ minWidth: '200px' }} setUser={setUser} />

        {/* <Chat /> */}
        <Routes>


          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/audio" element={<AudioCall />} />




          <Route path="/chats" element={<MultiChatWindow {...chatProps}
            style={{ height: '100vh', flexGrow: 1 }}
            renderChatHeader={() => {
              if (chatProps.chat && chatProps.chat.people) {
                if (chatProps.chat.people.length === 2) {
                  return <Chattop chat={chatProps.chat} username={chatProps.username} isActive={chatProps.activeChatId} />;
                } else {
                  return <GroupChatTop currentUser={user} chat={chatProps.chat} />;
                }
              }
              return null; // Or render a default/empty header
            }} />}
          />


          <Route path="/groups" element={
            user && <MultiChatWindow
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
              renderChatHeader={() => <Chattop chat={chatProps.chat} activeChatId={chatProps.activeChatId} user={user} username={chatProps.username} />}
              renderChatList={(chatListProps) => (
                <DirectChatList
                  currentUser={user}
                  chats={Dms}
                  onChatClick={(chat) => setSelectedChat(chat)}

                />
              )}



            />

          } />



          <Route path="/Knowledge-base" element={<KnowledgeBase />} />
          <Route path="/my-profile" element={<CurrentUser />} />
          {/* <Route path="/old-chat" element={<Chat />} /> */}

        </Routes>



      </div>

    </Router>

  }




  // {/* <AudioChat /> */}

  // {/* <Login /> */}





}





export default App
