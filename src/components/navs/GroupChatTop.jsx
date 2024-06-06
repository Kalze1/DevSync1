import React, { useState, useEffect } from 'react'
import { Avatar } from '../ui/avatar'
import ChatBar from '../main/chatbar'
import Profile from '../main/Profile'
import axios from 'axios'
import { getChat } from 'react-chat-engine'

const GroupChatTop = ({ chat }) => {

    if (!chat || !chat.title) {
        return null;
    }


    const title = chat.title;

    const [members, setMembers] = useState([])
    const [chats, setChats] = useState([])

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const [users, setUsers] = useState([])

    const [selectedUser, setSelectedUser] = useState([])

    const showModal = () => {
        document.getElementById('group_members').showModal()
    }


    const fetchUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${username}`);
            setUser(response.data);

            setError('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('User not found');
            } else {
                setError('Error fetching user');
            }
            setUser(null);
        }

        console.log('user state to be passed: ', user)

        document.getElementById('profile').showModal()


    };

    const getChatMembers = async () => {

        try {

            const projectID = 'your_project_id';
            const userSecret = 'your_user_secret';

            const response = await fetch(`https://api.chatengine.io/chats/`, {
                method: 'GET',
                headers: {
                    'Project-ID': import.meta.env.VITE_PROJECT_ID,
                    'User-Name': 'DagiB',
                    'User-Secret': 'Dagi1234'

                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            const members = data.map(data => data.people);

            console.log(members);


            console.log('direct data: ', data);
            setChats(data)
            console.log(chats);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }








    }

    useEffect(() => {
        const chatTitle = chat?.title;
        console.log('Chat title:', chatTitle);  // Log the chat title

        if (chatTitle) {
            const foundChat = chats.find(data => data.title === chatTitle);
            console.log('Found chat:', foundChat);  // Log the found chat

            if (foundChat) {
                const memberData = foundChat.people.map(person => ({
                    username: person.person.username,
                    avatar: person.person.avatar || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                }));
                setMembers(memberData);
            }
        }
        getChatMembers()

        axios.get('https://api.chatengine.io/users/', {
            headers: {
                'Private-Key': import.meta.env.VITE_PROJECT_KEY // Replace 'YOUR_PRIVATE_KEY' with your actual private key
            }
        })
            .then(response => {
                console.log('all users: ', response.data);
                setUsers(response.data)
            })
            .catch(error => {
                console.error(error);
            });

    }, [chat]);

    console.log('Members state:', members);  // Log the members state

    if (!chat || !chat.title) {
        return null;
    }

    return (
        <div>
            <nav className="bg-white dark:bg-gray-800 h-20  shadow ">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className=" flex items-center">


                            <div className="hidden md:block" onClick={showModal}>
                                <dialog id="group_members" className="modal">
                                    <div className="modal-box">
                                        <button className="absolute right-12 top-3.5">
                                            <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </button>
                                        <form className='flex' method="dialog">
                                            {/* if there is a button in form, it will close the modal */}


                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={(e) => e.stopPropagation()}>✕</button>
                                        </form>

                                        <div className='text text-xl mb-4'>

                                            {members.length} members
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                {/* head */}


                                                <tbody>
                                                    {/* row 1 */}


                                                    {members.map((member, index) => (
                                                        <tr key={index} onClick={() => fetchUser(member.username)}>
                                                            <td className='bg-white hover:bg-gray-200'>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="avatar">
                                                                        <div className="w-12 rounded-full">
                                                                            <img src={member.avatar} alt="avatar" />
                                                                        </div>
                                                                    </div>
                                                                    <div className='cursor-pointer'>
                                                                        <div className="font-bold">{member.username}</div>
                                                                        <div className="text-sm opacity-50">last seen recently</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}




                                                </tbody>


                                                <dialog id="profile" className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                                                        </form>
                                                        <Profile selectedUser={user} />
                                                    </div>
                                                </dialog>
                                                {/* foot */}


                                            </table>
                                        </div>

                                    </div>
                                </dialog>
                                <div className="flex items-baselines space-x-4">
                                    <a className="  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        <li className="flex flex-row">
                                            <div className="flex items-center flex-1 p-4 cursor-pointer select-none">

                                                <div className="flex-1 pl-1 mr-16">
                                                    <div className="font-medium dark:text-black">
                                                        {title}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-200">
                                                        {members.length} members
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <div className="flex items-center ml-4 md:ml-6">

                                <div className="relative ml-3">
                                    <div className="relative inline-block text-left">
                                        <div>
                                            <button type="button" className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mr-2 md:hidden">
                            <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">

                            </button>
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default GroupChatTop