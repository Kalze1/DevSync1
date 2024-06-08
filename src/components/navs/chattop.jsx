import React, { useState, useRef, useEffect } from 'react'
import Avatar from '../main/avatar'
import Profile from '../main/Profile';
import AudioCall from '../ChatsPage/AudioCall';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const chattop = ({ chat, username }) => {


    const [isConnected, setIsConnected] = useState(false)

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const intervalIdRef = useRef(null);


    const [roomid, setRoomid] = useState('main');
    const [audioTracks, setAudioTracks] = useState({
        localAudioTracks: null,
        remoteAudioTracks: {},
    });
    const [userWrappers, setUserWrappers] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [callerUid, setCallerUid] = useState(null);
    const [isCaller, setIsCaller] = useState(false);

    const appid = '5511b0a0a7364bcf91a13238d4590167';
    const token = null;
    const rtcUid = username;

    const rtcClient = useRef(null);

    useEffect(() => {
        rtcClient.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

        rtcClient.current.on('user-joined', handleUserJoined);
        rtcClient.current.on('user-published', handleUserPublished);
        rtcClient.current.on('user-left', handleUserLeft);

        socket.on('incoming_call', (data) => {
            if (!isJoined && !isCaller) {
                setIncomingCall(true);
                setCallerUid(data.uid);
            }
        });

        socket.on('call_ended', (data) => {
            if (isJoined) {
                leaveCall();
            }
        });

        return () => {
            if (isJoined) {
                leaveCall();
            }
        };
    }, [isJoined, isCaller]);

    const initRtc = async () => {
        await rtcClient.current.join(appid, roomid, token, rtcUid);
        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        setAudioTracks((prevTracks) => ({
            ...prevTracks,
            localAudioTracks: localAudioTrack,
        }));
        rtcClient.current.publish(localAudioTrack);

        const newUserWrapper = (
            <div key={rtcUid} id={rtcUid}>
                <p>{rtcUid}</p>
            </div>
        );
        setUserWrappers((prevWrappers) => [...prevWrappers, newUserWrapper]);
        setIsJoined(true);

        // Notify other users about the call
        socket.emit('call', { uid: rtcUid });
        setIsCaller(true);
    };

    const handleUserJoined = (user) => {
        console.log('new user joined: ', user);

        const newUserWrapper = (
            <div key={user.uid} id={user.uid}>
                <p>{user.uid}</p>
            </div>
        );
        setUserWrappers((prevWrappers) => [...prevWrappers, newUserWrapper]);
    };



    const handleUserPublished = async (user, mediaType) => {
        await rtcClient.current.subscribe(user, mediaType);
        if (mediaType === 'audio') {
            audioTracks.remoteAudioTracks[user.uid] = user.audioTrack;
            user.audioTrack.play();
        }
    };

    const handleUserLeft = (user) => {
        console.log('user left: ', user);
        delete audioTracks.remoteAudioTracks[user.uid];
        setUserWrappers((prevWrappers) =>
            prevWrappers.filter((wrapper) => wrapper.key !== user.uid.toString())
        );

        // If the other user leaves, end the call for this user as well
        leaveCall();
    };

    const leaveCall = async () => {
        if (audioTracks.localAudioTracks) {
            audioTracks.localAudioTracks.stop();
            audioTracks.localAudioTracks.close();
        }

        if (isJoined) {
            rtcClient.current.unpublish();
            await rtcClient.current.leave();
        }

        setIsJoined(false);
        setUserWrappers([]);
        setIncomingCall(false);
        setIsCaller(false);

        socket.emit('end_call', { uid: rtcUid });
    };


    const acceptCall = () => {
        setIncomingCall(false);
        initRtc();
    };

    const getOtherUser = (chat, username) => {
        const otherMember = chat.people.find(
            (member) => member.person.username !== username
        );
        return otherMember ? otherMember.person : null;
    };
    const otherUser = getOtherUser(chat, username);

    if (!otherUser) {
        return null;
    }



    return (
        <div>
            <nav className="bg-white dark:bg-gray-800  shadow ">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className=" flex items-center">
                            <a className="flex-shrink-0" href="/">



                            </a>
                            <div className="hidden md:block">
                                <div className="flex items-baselines space-x-4">

                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}

                                    <button onClick={() => document.getElementById('profile').showModal()} className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                                        <li className="flex flex-row">
                                            <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                                                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                                    <a className="relative block">
                                                        {/* {otherUser.avatar} */}
                                                    </a>
                                                </div>
                                                <div className="flex-1 pl-1 mr-16">
                                                    <div className="font-medium text-gray-900">
                                                        {otherUser.username}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-200">
                                                        {otherUser.isActive}
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    </button>

                                    <dialog id="profile" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                                            </form>
                                            <Profile />
                                        </div>
                                    </dialog>


                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <div className="flex items-center ml-4 md:ml-6">

                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <button className="p-6" onClick={() => document.getElementById('my_modal_1').showModal()}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>

                                </button>
                                <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Save chat to knowledge base</h3>
                                        <input type="text" placeholder="insert title" className="input m-4 input-bordered w-full max-w-xs" />
                                        <textarea placeholder="insert Description for the issue" className="textarea m-4 textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>




                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <button className="p-1 text-gray-400 rounded-full focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" onClick={() => document.getElementById('my_modal_4').showModal()}>



                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>


                                </button>
                                <dialog id="my_modal_4" className="modal">
                                    <div className="modal-box w-1/3 max-w-5xl">
                                        <div className="flex justify-evenly">
                                            <div className="avatar">
                                                <div className="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                </div>
                                            </div>

                                            <div className='grid '>
                                                <span className="loading loading-dots loading-lg ml-3"></span>

                                            </div>
                                            <div className="avatar">
                                                <div className="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                </div>
                                            </div>

                                        </div>
                                        <h3 className="font-bold text-lg text-center">
                                            {/* {isConnected ? <div>Connected</div> : <div>Connecting...</div>} */}
                                        </h3>
                                        <div className="modal-action flex justify-center">

                                            {/* if there is a button, it will close the modal */}
                                            <button className="btn btn-outline btn-success align-middle" onClick={initRtc} disabled={isJoined || incomingCall}>
                                                call

                                            </button>

                                            <form method="dialog">

                                                <button className="btn btn-outline btn-error align-middle" onClick={leaveCall} >End call</button>

                                            </form>


                                        </div>
                                        {incomingCall && (


                                            <div className="modal-box w-1/3 max-w-5xl">
                                                <div className="flex justify-center">
                                                    <div className="avatar">
                                                        <div className="w-24 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                        </div>
                                                    </div>



                                                </div>
                                                <br />

                                                <p className="font-bold text-lg text-center">Incoming call from {callerUid}</p>
                                                <div className="modal-action flex justify-center">
                                                    <form method="dialog">
                                                        {/* if there is a button, it will close the modal */}
                                                        <button className="btn btn-outline btn-success align-middle" onClick={acceptCall}>
                                                            Accept

                                                        </button>
                                                    </form>

                                                    <button className="btn btn-outline btn-error align-middle" onClick={leaveCall} >End call</button>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                </dialog>






                                <div className="relative ml-3">
                                    <div className="relative inline-block text-left">
                                        <details className="dropdown dropdown-left">
                                            <summary className="m-1 btn btn-ghost">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                </svg>
                                            </summary>
                                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                                <li><a>block user</a></li>
                                                <li><a>Report user</a></li>
                                            </ul>
                                        </details>


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

export default chattop