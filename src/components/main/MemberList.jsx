import React from 'react';
import { ChatSettings } from 'react-chat-engine-advanced';
import { getOrCreateChat } from 'react-chat-engine-advanced';

const ChatSettingsWithDirectChat = ({ projectID, userName, userSecret, chatID, onDirectChatCreated, chatLogic }) => {
    const handleMemberClick = (memberUserName) => {
        const chatConfig = {
            title: '',
            is_direct_chat: true,
            usernames: [userName, memberUserName],
        };

        getOrCreateChat(
            { projectID, userName, userSecret },
            chatConfig,
            (chat) => {
                onDirectChatCreated(chat);
            },
            (error) => {
                console.error('Error creating direct chat:', error);
            }
        );
    };

    const renderMemberList = (chat) => {
        return chat.people.map((member) => (
            <li key={member.person.username} onClick={() => handleMemberClick(member.person.username)}>
                {member.person.avatar && <img src={member.person.avatar} alt={member.person.username} />}
                {member.person.username}
            </li>
        ));
    };

    return (
        <ChatSettings
            chatID={chatID}
            renderMembers={(chat) => (
                <ul>
                    {renderMemberList(chat)}
                </ul>
            )}
        />
    );
};

export default ChatSettingsWithDirectChat;
