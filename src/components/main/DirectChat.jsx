// src/components/Chat.js
import React, { useState } from 'react';
import axios from 'axios';
import {
    MultiChatWindow,
    MultiChatSocket,
    useMultiChatLogic,
} from 'react-chat-engine-advanced';
// import { projectID, userName, userSecret } from '../ChatEngineConfig';
import SearchUsers from '../ChatsPage/SearchUser';

const Chat = () => {
    const [chat, setChat] = useState(null);

    const handleSelectUser = async (user) => {
        try {
            const response = await axios.post(
                `https://api.chatengine.io/chats/`,
                { usernames: [user.username], is_direct_chat: true },
                {
                    headers: {
                        'Project-ID': import.meta.env.VITE_PROJECT_ID,
                        'User-Name': 'DagiB',
                        'User-Secret': 'Dagi1234',
                    },
                }
            );
            setChat(response.data);
        } catch (error) {
            console.error('Error creating direct chat:', error);
        }
    };

    const chatProps = useMultiChatLogic({
        projectID: import.meta.env.VITE_PROJECT_ID,
        userName: 'DagiB',
        userSecret: 'Dagi1234',
    });

    return (
        <div>
            <SearchUsers onSelectUser={handleSelectUser} />
            {chat && (
                <>
                    <MultiChatSocket {...chatProps} chatId={chat.id} />
                    <MultiChatWindow {...chatProps} chatId={chat.id}
                        style={{ height: '100vh', flexGrow: 1 }} />
                </>
            )}
        </div>
    );
};

export default Chat;