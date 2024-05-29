import React, { useEffect, useState } from 'react';
import { ChatList, getChat } from 'react-chat-engine-advanced';

const DirectChatList = ({ projectID, userName, userSecret }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        getChat(
            { projectID, userName, userSecret },
            (chatList) => {
                const directChats = chatList.filter(chat => chat.is_direct_chat);
                setChats(directChats);
            },
            (error) => {
                console.error('Error fetching chats:', error);
            }
        );
    }, [projectID, userName, userSecret]);

    return (
        <ChatList chats={chats} />
    );
};

export default DirectChatList;
