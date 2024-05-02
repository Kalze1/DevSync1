import React, { useState, useRef, useEffect } from "react";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const messagesRef = useRef(null);

    const handleClick = () => {
        if (inputValue !== "") {
            setMessages((prevMessages) => [inputValue, ...prevMessages]);
            setInputValue("");
        }
    };

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className="container mx-auto p-4">
            <div
                className="flex flex-col-reverse space-y-4 h-64 overflow-y-auto"
                ref={messagesRef}
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className="p-2 bg-gray-200 rounded-md text-gray-800"
                    >
                        {message}
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 flex space-x-2">
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className="p-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleClick}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default App;