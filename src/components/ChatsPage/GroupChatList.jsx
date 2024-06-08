import React from 'react';
import { ChatList } from 'react-chat-engine-advanced';

const GroupChatList = (props) => {
    return (
        <ChatList
            {...props}
            renderChatList={(chatList) =>
                chatList.filter(chat => chat.people.length > 2)
            }
        />
    );
};

export default GroupChatList;