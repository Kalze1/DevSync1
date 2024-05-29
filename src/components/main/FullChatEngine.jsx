import React from 'react';
import {
    MultiChatSocket,
    MultiChatWindow,
    useMultiChatLogic,
    ChatList
} from 'react-chat-engine-advanced';


const DirectChatList = ({ chats, activeChat, setActiveChat }) => {
    const directChats = Object.values(chats).filter(chat => chat.is_direct_chat);

    return (
        <div className="chat-list">
            {directChats.map(chat => (
                <div
                    key={chat.id}
                    className={`chat-list-item ${activeChat === chat.id ? 'active' : ''}`}
                    onClick={() => setActiveChat(chat.id)}
                >
                    <div className="chat-title">{chat.title}</div>
                </div>
            ))}
        </div>
    );
};

const FullChatEngine = () => {
    const projectID = import.meta.env.VITE_PROJECT_ID;
    const userName = 'Tekuarit';
    const userSecret = 'Dagi9113';
    const chatLogic = useMultiChatLogic(projectID, userName, userSecret);

    return (
        <div className="chat-engine-container">
            <MultiChatSocket {...chatLogic} />
            <div className="chat-window-container">

                <ChatList
                    {...chatLogic}
                    renderChatList={(chatAppState) => (
                        <DirectChatList
                            chats={chatAppState.chats}
                            activeChat={chatAppState.activeChat}
                            setActiveChat={chatAppState.setActiveChat}
                        />
                    )}
                />
                <MultiChatWindow {...chatLogic} />
            </div>
        </div>
    );
};

export default FullChatEngine;
