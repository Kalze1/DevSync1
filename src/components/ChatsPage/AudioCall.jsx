import React, { useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
const AudioCall = () => {

    const [roomid, setRoomid] = useState('main')
    const [audioTracks, setAudioTracks] = useState({
        localAudioTracks: null,
        remoteAudioTracks: {}
    })
    const [userWrapper, setUserWrapper] = useState(null)

    const appid = "5511b0a0a7364bcf91a13238d4590167"
    const token = null;
    const rtcUid = Math.floor(Math.random() * 2032)

    let rtcClient;


    const initRtc = async () => {
        rtcClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
        await rtcClient.join(appid, roomid, token, rtcUid)
        audioTracks.localAudioTracks = await AgoraRTC.createMicrophoneAudioTrack()
        rtcClient.publish(audioTracks.localAudioTracks)


        const newUserWrapper = <div>
            <p>{rtcUid}</p>
        </div>
        setUserWrapper(newUserWrapper)

        rtcClient.on('user joined', handleUserJoined)

    }

    const handleUserJoined = async (user, mediaType) => {
        if (mediaType === 'audio') {
            console.log("New user joined", user)
        }
    }

    const leaveCall = async () => {
        audioTracks.localAudioTracks.stop()
        audioTracks.localAudioTracks.close()

        rtcClient.unpublish()
        rtcClient.leave()
       

    }


    return (
        <>
            <button onClick={initRtc}>Enter room</button>
            {userWrapper}
            <button onClick={leaveCall}>end call</button>
        </>
    )
}

export default AudioCall;

