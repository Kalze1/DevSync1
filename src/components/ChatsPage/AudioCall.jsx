import React, { useState, useRef, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const AudioCall = () => {
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
    const rtcUid = Math.floor(Math.random() * 2032);

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

    return (
        <>
            {/* <button onClick={initRtc} disabled={isJoined || incomingCall}>
                call
            </button>
            <br />
            <button onClick={leaveCall} disabled={!isJoined}>
                End call
            </button> */}



            {/* make the jsx below a component of its own and pass incoming call as a prop to it */}


        </>
    );
};

export default AudioCall;

