import React from 'react'

const IncomingCall = ({ callerUid, onAccept, onEndCall }) => {
  return (
    <div className="modal-box w-1/3 max-w-5xl">
      <div className="flex justify-center">
        <div className="avatar">
          {/* ... avatar image */}
        </div>
      </div>
      <br />
      <p className="font-bold text-lg text-center">Incoming call from {callerUid}</p>
      <div className="modal-action flex justify-center">
        <form method="dialog">
          <button className="btn btn-outline btn-success align-middle" onClick={onAccept}>
            Accept
          </button>
        </form>
        <button className="btn btn-outline btn-error align-middle" onClick={onEndCall}>
          End call
        </button>
      </div>
    </div>
  );
};
export default IncomingCall