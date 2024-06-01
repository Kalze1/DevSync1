import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

// Connect to the backend server
const socket = io('http://localhost:5000');

function App() {
    const [me, setMe] = useState('');
    const [stream, setStream] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);

    const myAudio = useRef();
    const userAudio = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        // Get user media (audio)
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
            setStream(stream);
            if (myAudio.current) {
                myAudio.current.srcObject = stream;
            }
        });

        // Set the user's socket ID
        socket.on('me', (id) => {
            setMe(id);
        });

        // Handle incoming call
        socket.on('callUser', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, []);

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me });
        });

        peer.on('stream', (stream) => {
            if (userAudio.current) {
                userAudio.current.srcObject = stream;
            }
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: caller });
        });

        peer.on('stream', (stream) => {
            if (userAudio.current) {
                userAudio.current.srcObject = stream;
            }
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    return (
        <div className="App">
            <h1>Audio Chat Application</h1>
            <div>
                <audio playsInline muted ref={myAudio} autoPlay />
                <audio playsInline ref={userAudio} autoPlay />
            </div>
            <p>Your ID: {me}</p>
            <div>
                {receivingCall && !callAccepted ? (
                    <div>
                        <h1>{caller} is calling...</h1>
                        <button onClick={answerCall}>Answer</button>
                    </div>
                ) : null}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="ID to call"
                    onChange={(e) => setCaller(e.target.value)}
                />
                <button onClick={() => callUser(caller)}>Call</button>
            </div>
        </div>
    );
}

export default App;