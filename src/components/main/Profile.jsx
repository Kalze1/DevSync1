import React from 'react'
import { useState, useEffect } from 'react';
import Avatar from './avatar'


const Profile = () => {


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

    // useEffect(() => {
    //   const fetchName = async () => {

    //       const response = await fetch('info.json');
    //       console.log("now");
    //       // console.log('44444444444444444444444444',response.json());
    //       // const data = ;
    //       var kal = await response.json()
    //       setName({"kkkk":"fff}"});

    //       console.log(name)

    //       // console.error('Error fetching user info:', error);
    //       // Handle errors gracefully (e.g., display an error message)

    //   };


    //     fetchName(); 

    // }, []);

    // const openModal = () => setIsOpen(true);
    // const closeModal = () => setIsOpen(false);




    return (
        <div className="grid gap-4 h-screen bg-gradient-to-r">

            <div className="navbar bg-base-100 p-7 max-h-40">
                <div className="flex-1">
                    <a className="text-xl">User Info</a>
                </div>
                <div className="flex-none">
                    <button className="pr-3 btn-ghost"><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="m-1 btn-ghost"><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 5H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 19H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <button className='flex flex-row gap-4'>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M22 10L8 10C0 10 0 21 8 21M22 10L15 3M22 10L15 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    <p>share this contact</p>
                                </button>
                            </li>
                            <li>
                                <button className='flex flex-row gap-4'>
                                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20.8 8.1C20.8 8.59706 20.3971 9 19.9 9C19.4029 9 19 8.59706 19 8.1C19 7.60294 19.4029 7.2 19.9 7.2C20.3971 7.2 20.8 7.60294 20.8 8.1Z" fill="#000000"></path><path d="M20.8 8.1C20.8 8.59706 20.3971 9 19.9 9C19.4029 9 19 8.59706 19 8.1C19 7.60294 19.4029 7.2 19.9 7.2C20.3971 7.2 20.8 7.60294 20.8 8.1ZM20.8 8.1V3.6C20.8 3.26863 21.0686 3 21.4 3H23" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path><path d="M16 17C14.8954 17 14 16.1046 14 15C14 13.8954 14.8954 13 16 13C17.1046 13 18 13.8954 18 15C18 16.1046 17.1046 17 16 17Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.9506 13C21.4489 18.0533 17.1853 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.4222 2 14.7751 2.2969 16 2.83209" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 9C8.22386 9 8 8.77614 8 8.5C8 8.22386 8.22386 8 8.5 8C8.77614 8 9 8.22386 9 8.5C9 8.77614 8.77614 9 8.5 9Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8C15.7761 8 16 8.22386 16 8.5C16 8.77614 15.7761 9 15.5 9Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    <p>edit contact</p>
                                </button>
                            </li>
                            <li>
                                <button className='flex flex-row gap-4'>
                                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20.8 8.1C20.8 8.59706 20.3971 9 19.9 9C19.4029 9 19 8.59706 19 8.1C19 7.60294 19.4029 7.2 19.9 7.2C20.3971 7.2 20.8 7.60294 20.8 8.1Z" fill="#000000"></path><path d="M20.8 8.1C20.8 8.59706 20.3971 9 19.9 9C19.4029 9 19 8.59706 19 8.1C19 7.60294 19.4029 7.2 19.9 7.2C20.3971 7.2 20.8 7.60294 20.8 8.1ZM20.8 8.1V3.6C20.8 3.26863 21.0686 3 21.4 3H23" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path><path d="M16 17C14.8954 17 14 16.1046 14 15C14 13.8954 14.8954 13 16 13C17.1046 13 18 13.8954 18 15C18 16.1046 17.1046 17 16 17Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.9506 13C21.4489 18.0533 17.1853 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.4222 2 14.7751 2.2969 16 2.83209" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 9C8.22386 9 8 8.77614 8 8.5C8 8.22386 8.22386 8 8.5 8C8.77614 8 9 8.22386 9 8.5C9 8.77614 8.77614 9 8.5 9Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8C15.7761 8 16 8.22386 16 8.5C16 8.77614 15.7761 9 15.5 9Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    <p>block contact</p>
                                </button>
                            </li>
                            <li>
                                <button className='flex flex-row gap-4'>
                                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M8.99219 13H11.9922H14.9922" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.03919 4.2939C3.01449 4.10866 3.0791 3.92338 3.23133 3.81499C3.9272 3.31953 6.3142 2 12 2C17.6858 2 20.0728 3.31952 20.7687 3.81499C20.9209 3.92338 20.9855 4.10866 20.9608 4.2939L19.2616 17.0378C19.0968 18.2744 18.3644 19.3632 17.2813 19.9821L16.9614 20.1649C13.8871 21.9217 10.1129 21.9217 7.03861 20.1649L6.71873 19.9821C5.6356 19.3632 4.90325 18.2744 4.73838 17.0378L3.03919 4.2939Z" stroke="#000000" stroke-width="1.5"></path><path d="M3 5C5.57143 7.66666 18.4286 7.66662 21 5" stroke="#000000" stroke-width="1.5"></path></svg>
                                    <p>delete contact</p>
                                </button>
                            </li>

                        </ul>
                    </div>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
                    </form>
                </div>
            </div>


            <div className="card card-side bg-base-100 p shadow-xl flex flex-row">
                <div className="avatar pt-6 top-5 pl-5">
                    <Avatar />
                </div>

                <div className="card-body flex flex-row pb-5 ">
                    <div className='pr-5'>
                        <h2 className="card-title ">{user.firstname}  {user.lastname}</h2>
                        <p>{user.lastseen}</p>
                    </div>
                    <div>
                        <h1>rating</h1>
                        <div className="rating rating-lg">
                            <h1>{user.rating}/10</h1>
                        </div>
                    </div>
                </div>
            </div>

            


            <div className="card card-side bg-base-100 shadow-xl ">
                <div>
                    <svg className='' width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 11.5V16.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 7.51L12.01 7.49889" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>

                <div className="card-body  h-fit-content">
                    <div className='felx flex-row'>
                        <div>
                            <h2>user</h2>
                            <h1>{user.username}</h1>
                        </div>
                    </div>

                    <div>
                        <h2>Bio</h2>
                        <p>{user.bio}</p>
                    </div>

                    <div className='hover:bg-gray-200'>
                        <a href="#####">SEND MESSAGE</a>
                        {/* <a href="#chat-section" class="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700">Open Chat</a> */}
                    </div>

                    <div className="form-control hover:bg-gray-200">
                        <label className="label cursor-pointer">
                            <span className="label-text">Notfication</span>
                            <input type="checkbox" className="toggle" />
                        </label>
                    </div>

                    <div tabIndex={0} className="collapse collapse-arrow border bg-fff border-base-300 bg-base-200">
                        <div className="collapse-title text-xl font-medium">skill
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
                </div>
            </div>


            <div className="card card-side pt-5 bg-base-100 shadow-xl flex flex-col">
                {
                    user.media.map((media, index) => (
                        <div key={index} className='flex flex-row pb-6 hover:bg-gray-200 pl-3 gap-3'>
                            {media.icon}
                            {/* {icon.media.type} */}
                            <div className='flex flex-row  gap-2'>
                                <h2>{media.no}</h2>
                                <p>{media.type}</p>
                            </div>
                        </div>
                    ))}

            </div>


            <div className='pt-5' >
                {
                    user.contact.map((contact, index) => (
                        <div key={index} className='flex flex-row pb-6 hover:bg-gray-200 pl-3 gap-3'>
                            {contact.icon}

                            <div className='flex flex-row  gap-2'>
                                <p>{contact.uadd}</p>
                            </div>
                        </div>
                    ))}


                <div className="flex flex-row pb-6 hover:bg-gray-200">
                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 17V13.5V10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 7.01L7.01 6.99889" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <a href="https://swww.linkedin.com">LinkedIn</a>
                </div>

                

            </div>
        </div>
    )
}

export default Profile