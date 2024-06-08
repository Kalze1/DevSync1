import React, { useEffect, useState } from 'react';
import { useMultiChatLogic, ChatList } from 'react-chat-engine-advanced';
import chat from './chat';
import axios from 'axios';
const CustomChatList = (props) => {
    const { chats } = useMultiChatLogic();

    const directChats = chats.filter(chat => chat.is_direct_chat);

    const [fetchedChats, setFetchedChats] = useState([])

    const [Dms, setDms] = useState([fetchedChats.filter(chat => chat.is_direct_chat)])


    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get(
                    'https://api.chatengine.io/chats/',
                    {
                        headers: {
                            'Project-ID': import.meta.env.VITE_PROJECT_ID,
                            'User-Name': 'DagiB',
                            'User-Secret': 'Dagi1234'
                        },
                    }
                );

                console.log('Chats fetched successfully(for DM):', response.data);
                setFetchedChats(response.data);

                const directMessages = response.data.filter(chat => chat.is_direct_chat);
                console.log(directMessages);
                setDms(directMessages);
                console.log(directMessages);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);
    return (
        <div>
            {Dms.map((chat, index) => (

                <div>{chat.title}</div>

            ))}
        </div>
    );
};

export default CustomChatList;