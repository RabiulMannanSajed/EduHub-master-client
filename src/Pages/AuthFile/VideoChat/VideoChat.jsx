import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const VideoChat = () => {
  const [peerId, setPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const localVideo = useRef();
  const remoteVideo = useRef();
  const currentCall = useRef();

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      setPeerId(id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideo.current.srcObject = stream;
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            remoteVideo.current.srcObject = remoteStream;
          });
        });
      currentCall.current = call;
    });

    return () => {
      peer.disconnect();
    };
  }, []);

  const callPeer = () => {
    const peer = new Peer();
    peer.on("open", (id) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideo.current.srcObject = stream;
          const call = peer.call(remoteId, stream);
          call.on("stream", (remoteStream) => {
            remoteVideo.current.srcObject = remoteStream;
          });
          currentCall.current = call;
        });
    });
  };

  return (
    <div className="h-screen">
      <div className="text-center font-bold text-2xl">
        <p className="m-6">Share this id to take Class</p>
        <h2 className="mb-4">Your ID: {peerId}</h2>
      </div>
      <div className="w-[20%] mx-auto">
        <input
          type="text"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          placeholder="Enter a code"
        />
        <button className="" onClick={callPeer}>
          Join{" "}
        </button>
      </div>
      <div className="w-[80%] mx-auto">
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <video ref={localVideo} autoPlay muted style={{ width: "500px" }} />
          <video ref={remoteVideo} autoPlay style={{ width: "500px" }} />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
