import React from 'react';

const CustomChatFeed = (props) => {
    const { chats = {}, activeChatId = null, messages = [], user = {} } = props;

    if (!activeChatId || !chats[activeChatId]) {
        return <div>Select a chat to start messaging</div>;
    }

    return (
        <div className="custom-chat-feed">
            <h2>{chats[activeChatId].title}</h2>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === user.username ? 'sent' : 'received'}`}>
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-text">{message.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomChatFeed;
