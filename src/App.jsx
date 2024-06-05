import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

import "./App.css";
import Chatbar from "./components/main/chatbar";
import Chat from "./components/main/chat";
import Sidebar from "./components/main/sidebar";
import Demo from "./components/main/demo";
import KnowledgeBase from "./components/main/KnowledgeBase";
import GroupChat from "./components/main/GroupChat";
import GroupChatBar from "./components/main/GroupChatBar";
import { RecentMessageContext } from "./contexts/RecentMessageContext";
// import Profile from "./components/main/Profile";
import ChatAse from "./components/main/ChatAse";
import ChatE from "./components/main/ChatE";
import { ChatEngine, ChatEngineWrapper, Socket, ChatFeed, ChatSettings, ChatList } from "react-chat-engine";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow, getOrCreateChat } from "react-chat-engine-advanced";
import Sign_Up from "./components/main/Sign_Up";
import Login from "./components/main/Login";
import Navbar from "./components/navs/Navbar";
import ChatPretty from "./components/main/ChatPretty";
import FullChatEngine from "./components/main/FullChatEngine";
import DirectChatList from "./components/main/DirectChatList";
import MemberList from "./components/main/MemberList";

function App() {
  const [recentMessage, setRecentMessage] = useState("recent message");
  const [messageTime, setMessageTime] = useState(null);
  const [user, setUser] = useState(undefined);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  
  console.log(user)

  const handleDirectChatCreated = (chat) => {
    setSelectedChat(chat.id);
  };

  const projectId = "b7fa4655-c0a7-4b26-8d55-0e2a6f3af468";

  useEffect(() => {
    if (user) {
      getOrCreateChat(
        { projectId, username: user.username, secret: user.password },
        {},
        (chats) => {
          const directChats = chats.filter(chat => chat.is_direct_chat);
          setChats(directChats);
        },
        (error) => {
          console.error('Error fetching chats:', error);
        }
      );
    }
  }, [projectId, user]);

  const chatProps = useMultiChatLogic(projectId, user?.username, user?.secret);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/side" element={<Sidebar style={{ minWidth: '200px' }} />} />
        <Route path="/chats" element={
          user ? (
            <MultiChatWindow
              
            projectId={projectId}
            username={user.userName}
            secret={user.secret}
              style={{ height: '100vh', flexGrow: 1 }}
              renderChatSettings={(chatAppState) => (
                <div>
                  <MemberList
                    
                    projectID={projectId}
                    chatID={chatAppState.activeChat}
                    userName={user.username}
                    userSecret={user.password}
                    onDirectChatCreated={handleDirectChatCreated}
                    chatLogic={chatProps}
                  />
                </div>
              )}
            />
          ) : (
            <div>Please log in to access the chats.</div>
          )
        } />
        <Route path="/groups" element={
          user ? (
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
              renderChatList={(chatAppState) => (
                <DirectChatList
                  projectID={projectId}
                  userName={user.username}
                  userSecret={user.password}
                  {...chatAppState}
                />
              )}
            />
          ) : (
            <div>Please log in to access the groups.</div>
          )
        } />
        <Route path="/Knowledge-base" element={<KnowledgeBase />} />
      </Routes>
    </Router>
  );
}

export default App;
