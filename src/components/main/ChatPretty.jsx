import React from 'react';

import { PrettyChatWindow } from 'react-chat-engine-pretty';

export function ChatPretty() {
    return (
        <div className="background">
            <div className='chat-wrapper'>
                <PrettyChatWindow
                    projectId="791f28ff-082b-47d7-96c0-6a79afd19040"
                    username="Dagim"
                    secret="123456789"
                />
            </div>
        </div>
    );
}

export default ChatPretty;