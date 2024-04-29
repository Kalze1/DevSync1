import React from 'react'
import Chattop from './chattop'
import Chatinput from './chatinput'
import { useState } from 'react'

import EmojiPicker from '../ui/emojiPicker'
import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
// new Picker({ data })



const chat = () => {

    const [message, setMessage] = useState(null);
    // const [bubbleMessage, setBubbleMessage] = useState(false);
    const [messages, setMessages] = useState([])

    const [code, setCode] = useState('')
    const [isCode, setIsCode] = useState(false)

    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
    };


    function HighlightCode({ children, language }) {
        useEffect(() => {
            const pre = document.querySelector('.highlight');
            if (pre) {
                hljs.highlightElement(pre);
            }
        }, [children, language]);

        return (
            <pre className={`highlight ${language}`}>
                <code>{children}</code>
            </pre>
        );
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const displayMessage = () => {

        if (message.trim() !== '') {  // Only add non-empty messages
            setMessages([...messages, message]);
            setMessage('');  // Clear the input field after sending
        }

    }

    const sendCode = () => {
        displayMessage()
        setIsCode(true)
        console.log(isCode);
    }
    return (
        <>





            <div className="w-1/2 flex flex-col">
                <Chattop />



                {/* <div className='mt-auto'>



                    <div className="chat chat-start m-4">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="chat-header">


                        </div>
                        <div className="chat-bubble">You were the Chosen One!</div>
                        <div className="chat-footer opacity-50">
                            12:46
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="chat-header">


                        </div>
                        <div className="chat-bubble">I hate you!</div>
                        <div className="chat-footer opacity-50">
                            12:46
                        </div>
                    </div>

                </div> */}

                <div className="flex flex-col flex-auto h-full p-6 contain" >
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                        <div className="flex flex-row items-center">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                A
                                            </div>
                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div>Hey How are you today?</div>
                                            </div>
                                        </div>
                                    </div>




                                    {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                        <div className="flex flex-row items-center">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                A
                                            </div>
                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div className="flex flex-row items-center">
                                                    <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
                                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </button>
                                                    <div className="flex flex-row items-center space-x-px ml-4">
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-12 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-6 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-5 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-3 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-10 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-1 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-8 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-2 w-1 bg-gray-500 rounded-lg" />
                                                        <div className="h-4 w-1 bg-gray-500 rounded-lg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {

                                        messages.map((msg, index) => (

                                            <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        A
                                                    </div>
                                                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                        <div>{
                                                            isCode ? (
                                                                <HighlightCode>{msg}</HighlightCode>
                                                            ) :
                                                                (msg)

                                                        }</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))


                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center h-16 rounded-xl bg-white contain px-4 ">
                            <div>
                                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                            </div>
                            <div className='pl-2'>

                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>

                                    <svg className="w-5 h-5 svg-icon text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 6L10 18.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.5 8.5L3 12L6.5 15.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.5 8.5L21 12L17.5 15.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>

                                </button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        {/* <h3 className="font-bold text-lg">Hello!</h3> */}
                                        {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                                        <textarea placeholder="Paste your code here" value={message} onChange={handleChange} className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                                        <div className="">
                                            <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={sendCode}>
                                                <span>Send</span>
                                                <span className="ml-2">
                                                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input type="text" onChange={handleChange} value={message} className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />

                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600" onClick={() => document.getElementById('my_modal_4').showModal()}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <dialog id="my_modal_4" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <Picker data={data} onEmojiSelect={console.log} />
                                        </div>
                                    </dialog>
                                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 mr-8 text-gray-400 hover:text-gray-600">
                                        <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><rect x={9} y={2} width={6} height={12} rx={3} stroke="#000000" strokeWidth="1.5" /><path d="M5 10V11C5 14.866 8.13401 18 12 18V18V18C15.866 18 19 14.866 19 11V10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 18V22M12 22H9M12 22H15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4">
                                <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={displayMessage}>
                                    <span>Send</span>
                                    <span className="ml-2">
                                        <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>



                    </div>
                </div>

                {/* <EmojiPicker /> */}

                {/* <div className='p-4'>
                    <Chatinput />
                </div> */}

            </div>

        </>

    )
}

export default chat