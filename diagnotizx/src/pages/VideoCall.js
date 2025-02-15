import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { FaPaperPlane, FaPhoneSlash } from "react-icons/fa";
import "./Videocall.css";

const VideoCall = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const callId = `doctor-patient-${patientId}`;
  const [inCall, setInCall] = useState(true);
  const [prescription, setPrescription] = useState("");

  useEffect(() => {
    startVideoCall();
  }, []);

  const startVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
      const pc = new RTCPeerConnection(servers);
      peerConnectionRef.current = pc;

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pc.onicecandidate = async (event) => {
        if (event.candidate) {
          await setDoc(doc(db, "calls", callId, "candidates", event.candidate.candidate), {
            candidate: event.candidate.toJSON(),
          });
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await setDoc(doc(db, "calls", callId), { offer });

      listenForAnswer(pc);
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };

  const listenForAnswer = (pc) => {
    onSnapshot(doc(db, "calls", callId), async (snapshot) => {
      const data = snapshot.data();
      if (data?.answer && !pc.currentRemoteDescription) {
        const remoteDesc = new RTCSessionDescription(data.answer);
        await pc.setRemoteDescription(remoteDesc);
      }
    });
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setInCall(false);
    navigate("/dashboard");
  };

  const sendPrescription = () => {
    if (prescription.trim() !== "") {
      console.log("Prescription sent:", prescription);
      setPrescription("");
    }
  };

  return (
    <div className="video-call-page">
      <h2>Video Consultation with {patientId}</h2>
      <div className="video-container">
        <video ref={localVideoRef} autoPlay playsInline muted className="video" />
        <video ref={remoteVideoRef} autoPlay playsInline className="video" />
      </div>

      {/* Prescription Input Box */}
      <div className="prescription-box">
        <input
          type="text"
          placeholder="Write a prescription..."
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
        <button className="send-btn" onClick={sendPrescription}>
          <FaPaperPlane />
        </button>
      </div>

      {/* End Call Button */}
      <button className="end-call-btn" onClick={endCall}>
        <FaPhoneSlash /> End Call
      </button>
    </div>
  );
};

export default VideoCall;
