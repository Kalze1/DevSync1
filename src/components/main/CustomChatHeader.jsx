import React from 'react';

const CustomChatHeader = ({ chat }) => {
    // Check if the chat object is valid and contains the necessary data
    if (!chat || !chat.title) {
        return null;
    }

    // Extract chat title
    const title = chat.title;

    return (
        <div>
            <h2>{title}</h2>
        </div>
    );
};

export default CustomChatHeader;