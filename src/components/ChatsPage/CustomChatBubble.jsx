import React from 'react';

const CustomChatBubble = ({ message, isSender }) => {
    return (
        <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">{message.text}</div>
        </div>

    );
};

export default CustomChatBubble;