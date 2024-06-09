import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../main/avatar';
import Profile from '../main/Profile';
import AudioCall from '../ChatsPage/AudioCall';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { io } from 'socket.io-client';
import axios from 'axios';
const socket = io('http://localhost:5000');




const Chattop = ({ chat, username, activeChatId, user }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const intervalIdRef = useRef(null);

    const [roomid, setRoomid] = useState("main");
    const [audioTracks, setAudioTracks] = useState({
        localAudioTracks: null,
        remoteAudioTracks: {},
    });
    const [userWrappers, setUserWrappers] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);
    const [callerUid, setCallerUid] = useState(null);
    const [isCaller, setIsCaller] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);

    const appid = "5511b0a0a7364bcf91a13238d4590167";
    const token = null;
    const rtcUid = Math.floor(Math.random() * 2032);
    const rtcClient = useRef(null);

    const fetchMessages = async (chat_id, userSecret, username, projectID) => {
        try {
            const response = await axios.get(
                `https://api.chatengine.io/chats/${chat_id}/messages/`,
                {
                    headers: {
                        "Project-ID": projectID,
                        "User-Name": username,
                        "User-Secret": userSecret,
                    }
                }
            );
            console.log("Messages:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (user && activeChatId) {
            fetchMessages(activeChatId, user.password, user.username, import.meta.env.VITE_PROJECT_ID);
        }
    }, [activeChatId, user]);

    useEffect(() => {
        rtcClient.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        rtcClient.current.on("user-joined", handleUserJoined);
        rtcClient.current.on("user-published", handleUserPublished);
        rtcClient.current.on("user-left", handleUserLeft);

        socket.on("incoming_call", (data) => {
            if (!isJoined && !isCaller) {
                setIncomingCall(true);
                setCallerUid(data.uid);
            }
        });

        socket.on("call_ended", (data) => {
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

        socket.emit("call", { uid: rtcUid });
        setIsCaller(true);
    };

    const handleUserJoined = (user) => {
        console.log("new user joined: ", user);

        const newUserWrapper = (
            <div key={user.uid} id={user.uid}>
                <p>{user.uid}</p>
            </div>
        );
        setUserWrappers((prevWrappers) => [...prevWrappers, newUserWrapper]);
    };

    const handleUserPublished = async (user, mediaType) => {
        await rtcClient.current.subscribe(user, mediaType);
        if (mediaType === "audio") {
            audioTracks.remoteAudioTracks[user.uid] = user.audioTrack;
            user.audioTrack.play();
        }
    };

    const handleUserLeft = (user) => {
        console.log("user left: ", user);
        delete audioTracks.remoteAudioTracks[user.uid];
        setUserWrappers((prevWrappers) =>
            prevWrappers.filter((wrapper) => wrapper.key !== user.uid.toString())
        );

        leaveCall();
    };

    // const leaveCall = async () => {
    //     if (audioTracks.localAudioTracks) {
    //         audioTracks.localAudioTracks.stop();
    //         audioTracks.localAudioTracks.close();
    //     }

    //     if (isJoined) {
    //         rtcClient.current.unpublish();
    //         await rtcClient.current.leave();
    //     }

    //     setIsJoined(false);
    //     setUserWrappers([]);
    //     setIncomingCall(false);
    //     setIsCaller(false);
    //     setCallAccepted(false);

    //     socket.emit("end_call", { uid: rtcUid });
    // };

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
        setCallAccepted(false); // Reset callAccepted state

        rtcClient.current = null; // Reset rtcClient
        setAudioTracks({
            localAudioTracks: null,
            remoteAudioTracks: {},
        }); // Reset audioTracks

        socket.emit('end_call', { uid: rtcUid });
    };

    const acceptCall = () => {
        setIncomingCall(false);
        setCallAccepted(true);
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
            <nav className="bg-white dark:bg-gray-800 shadow">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a className="flex-shrink-0" href="/"></a>
                            <div className="hidden md:block">
                                <div className="flex items-baselines space-x-4">
                                    <button
                                        onClick={() =>
                                            document.getElementById("profile").showModal()
                                        }
                                        className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        <li className="flex flex-row">
                                            <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                                                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                                    <a className="relative block"></a>
                                                </div>
                                                <div className="flex-1 pl-1 mr-16">
                                                    <div className="font-medium text-gray-900">
                                                        {otherUser.username}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-200">
                                                        online
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </button>

                                    <dialog id="profile" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    ✕
                                                </button>
                                            </form>
                                            <Profile />
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <div className="flex items-center ml-4 md:ml-6">
                                <button
                                    className="p-6"
                                    onClick={() => {
                                        fetchMessages(
                                            activeChatId,
                                            user?.password,
                                            user?.username,
                                            import.meta.env.VITE_PROJECT_ID
                                        );
                                        document.getElementById("knowledge-base").showModal();
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        />
                                    </svg>
                                </button>

                                <button
                                    className="p-6"
                                    onClick={() =>
                                        document.getElementById("audio-call-modal").showModal()
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                        />
                                    </svg>
                                </button>

                                <dialog id="knowledge-base" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                            Save chat to knowledge base
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder="insert title"
                                            className="input m-4 input-bordered w-full max-w-xs"
                                        />
                                        <textarea
                                            placeholder="insert Description for the issue"
                                            className="textarea m-4 textarea-bordered textarea-lg w-full max-w-xs"
                                        ></textarea>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <div className="flex items-center ml-4 md:ml-6">
                                <dialog id="audio-call-modal" className="modal">
                                    <div className="modal-box">
                                        <div className="flex flex-col items-center">
                                            <h3 className="font-bold text-lg">Audio Call</h3>
                                            <div className="mt-4">
                                                {isJoined ? (
                                                    <div>
                                                        <div>Calling: {username}</div>
                                                        <button onClick={leaveCall} className="btn btn-danger mt-4">End Call</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={initRtc} className="btn btn-primary mt-4">Start Call</button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>


                                {incomingCall && (
                                    <dialog open className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Incoming Call</h3>
                                            <p>From: {username}</p>
                                            <div className="modal-action">
                                                {callAccepted ? (
                                                    <button
                                                        onClick={leaveCall}
                                                        className="btn btn-danger"
                                                    >
                                                        End Call
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={acceptCall}
                                                            className="btn btn-primary"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => setIncomingCall(false)}
                                                            className="btn btn-danger"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </dialog>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Chattop;
