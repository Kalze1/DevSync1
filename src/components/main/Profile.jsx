import React from 'react'
import { useState, useEffect } from 'react';
import Avatar from './avatar'
import axios from 'axios';

const Profile = ({ selectedUser, currentUser }) => {


    // const [isOpen, setIsOpen] = useState(true);


    // State to store fetched user info
    const [user, setUser] = useState({
        username: "@deborah123",
        email: "deborah@gmail.com",
        firstname: "Deborah",
        lastname: "Tamrat",
        lastseen: "recently",
        bio: "Lorem ipsum dolor, sit amet consectetur!",
        rating: 8.2,
        skills: [{
            language: "java",
            level: 8
        },
        {
            language: "python",
            level: 7
        },
        {
            language: "React",
            level: 8.5
        }],
        media: [
            {
                type: "photos",
                no: 23,
                icon: <svg className='text-blue-500' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            },
            {
                type: "files",
                no: 15,
                icon: <svg className='text-blue-500' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            },
            {
                type: "audio files",
                no: 16,
                icon: <svg className='text-blue-500' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            },
            {
                type: "shared linkes",
                no: 3,
                icon: <svg className='text-blue-500' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            },
            {
                type: "voice message",
                no: 1,
                icon: <svg className='text-blue-500' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            },
            {
                type: "group in common",
                no: 16,
                icon: <svg className='text-blue-500' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            },

        ],
        contact: [{
            pname: "linkedin",
            uadd: "linkedin/deborah",
            icon: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17V13.5V10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7.01L7.01 6.99889" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

        },

        {
            pname: "youtube",
            uadd: "youtube/deborah",
            icon: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17V13.5V10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7.01L7.01 6.99889" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

        },
        {
            pname: "github",
            uadd: "github/deborah",
            icon: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17V13.5V10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7.01L7.01 6.99889" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

        }
        ]

    });

    const [newUser, setNewUser] = useState({})


    const createChat = async () => {

        const url = 'https://api.chatengine.io/chats/';
        const headers = {
            'Project-ID': import.meta.env.VITE_PROJECT_ID, // Replace with your Project ID
            'User-Name': currentUser.username, // Replace with your User Name
            'User-Secret': currentUser.password, // Replace with your User Secret

        };

        const chatData = {
            usernames: [newUser.username], // Creating a direct chat with the selected user
            // title: newUser.username,
            is_direct_chat: true
        };

        try {

            const response = await axios.put(url, chatData, { headers });
            console.log('Direct chat created successfully:', response.data);

        } catch (error) {
            console.error('Error creating direct chat:', error);

        }

    }


    useEffect(() => {


        console.log(selectedUser);
        setNewUser(selectedUser)
        console.log(currentUser);
        console.log('new user: ', newUser);
    }, [selectedUser]);



    return (
        <div className="grid gap-4 h-screen bg-gradient-to-r">

            <div className="navbar bg-base-100 ">
                <div className="flex-1">
                    <a className="text-xl">User Info</a>
                </div>
                <div className="flex-none">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
                    </form>
                </div>
            </div>


            <div className="card card-side bg-base-100 shadow-xl flex flex-row">
                <div className="avatar pt-3 top-5 pl-5">
                    <Avatar />
                </div>

                <div className="card-body flex flex-row pb-5 ">
                    <div className='pr-5'>
                        <h2 className="card-title ">{newUser?.firstName}  {newUser?.lastName}</h2>
                        <p>{user.lastseen}</p>
                    </div>
                    <div>
                        <h1>rating</h1>
                        <div className="rating rating-lg">
                            <h1>{newUser?.rating}/10</h1>
                        </div>
                    </div>
                </div>
            </div>




            <div className="card card-side bg-base-100 shadow-xl h-full ">
                <div>
                    <svg className='' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 11.5V16.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 7.51L12.01 7.49889" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>

                <div className="card-body  h-fit-content">
                    <div className='felx flex-row'>
                        <div>
                            <h2 className='text-lg font-bold'>username</h2>
                            <h1>{newUser?.username}</h1>
                        </div>
                    </div>

                    <div>
                        <h2 className='text-lg font-bold'>Bio</h2>
                        <p>{user.bio}</p>
                    </div>

                    <div onClick={createChat} className='hover:bg-gray-200'>
                        <a>Send Message</a>
                        {/* <a href="#chat-section" class="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700">Open Chat</a> */}
                    </div>


                    <div tabIndex={0} className="collapse collapse-arrow border bg-fff border-base-300 bg-base-200">
                        <div className="collapse-title text-lg font-semibold">skill set
                        </div>

                        <div className="collapse-content">
                            {
                                user.skills.map((skill, index) => (
                                    <div key={index} className='flex flex-row'>
                                        <h1 className='pr-5'>{skill.language}</h1>
                                        <h1>{skill.level}/10</h1>
                                    </div>
                                ))}
                        </div>


                    </div>
                    <h2 className='text-lg font-bold'>Contact Info</h2>
                    <p>Github: github.com/{newUser?.github}</p>
                </div>
            </div>






        </div>
    )
}

export default Profile