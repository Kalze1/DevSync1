import React from 'react';
import { ChatList } from 'react-chat-engine-advanced';

const DirectChatList = ({ chats, onChatClick }) => {
    return (
        <ChatList
            chats={chats}
            renderChat={(chat) => (
                <div onClick={() => onChatClick(chat)} key={chat.id}>
                    {chat.title}
                </div>
            )}
        />
    );
};

export default DirectChatList;
