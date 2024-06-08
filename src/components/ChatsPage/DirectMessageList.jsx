// DirectChatList.jsx
import React from 'react';
import { ChatList } from 'react-chat-engine-advanced';

const DirectMessageList = (props) => {
    const renderChatList = (chatList) => {
        if (!Array.isArray(chatList)) {
            return null; // Return null if chatList is not an array
        }

        const directChats = chatList.filter(chat => chat.people.length === 2);
        return directChats.map(chat => (
            <div key={chat.id}>
                {/* Render chat list item here */}
                {chat.title}
            </div>
        ));
    };

    return (
        <ChatList
            {...props}
            renderChatList={renderChatList}
        />
    );
};

export default DirectMessageList;
