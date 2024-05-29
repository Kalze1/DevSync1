import react from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow, } from 'react-chat-engine-advanced'
import ChatTop from '../navs/chattop'

const projectId = import.meta.env.VITE_PROJECT_ID;
const username = "test_user";
const secret = "1234";

const ChatE = () => {
    const chatProps = useMultiChatLogic(projectId, username, secret)

    return (

        <div className='chat-font'>

            <MultiChatSocket
                projectId={chatProps.projectId}
                username={chatProps.username}
                secret={chatProps.secret}
                onConnect={chatProps.onConnect}
                onAuthFail={chatProps.onAuthFail}
                onNewChat={chatProps.onNewChat}
                onEditChat={chatProps.onEditChat}
                onDeleteChat={chatProps.onDeleteChat}
                onNewMessage={chatProps.onNewMessage}
                onEditMessage={chatProps.onEditMessage}
                onDeleteMessage={chatProps.onDeleteMessage}
                onIsTyping={chatProps.onIsTyping}
            />

            <MultiChatWindow
                chats={chatProps.chats}
                messages={chatProps.messages}
                activeChatId={chatProps.activeChatId}
                username={chatProps.username}
                peopleToInvite={chatProps.peopleToInvite}
                hasMoreChats={chatProps.hasMoreChats}
                hasMoreMessages={chatProps.hasMoreMessages}
                onChatFormSubmit={chatProps.onChatFormSubmit}
                onChatCardClick={chatProps.onChatCardClick}
                onChatLoaderShow={chatProps.onChatLoaderShow}
                onMessageLoaderShow={chatProps.onMessageLoaderShow}
                onMessageLoaderHide={chatProps.onMessageLoaderHide}
                onBottomMessageShow={chatProps.onBottomMessageShow}
                onBottomMessageHide={chatProps.onBottomMessageHide}
                onMessageFormSubmit={chatProps.onMessageFormSubmit}
                onInvitePersonClick={chatProps.onInvitePersonClick}
                onRemovePersonClick={chatProps.onRemovePersonClick}
                onDeleteChatClick={chatProps.onDeleteChatClick}
                style={{ height: '100vh' }}
            />
        </div>




    );
}



export default ChatE