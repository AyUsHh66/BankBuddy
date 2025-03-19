// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";

// const VideoInteraction = () => {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const videoRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);

//   useEffect(() => {
//     // Request camera access when component mounts
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setMediaStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((err) => console.error("Error accessing webcam:", err));
//   }, []);

//   const startRecording = () => {
//     if (!mediaStream) {
//       alert("Webcam not started. Please allow camera access.");
//       return;
//     }

//     setRecording(true);
//     mediaRecorderRef.current = new MediaRecorder(mediaStream, { mimeType: "video/webm" });
//     const chunks = [];

//     mediaRecorderRef.current.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         chunks.push(event.data);
//       }
//     };

//     mediaRecorderRef.current.onstop = () => {
//       const blob = new Blob(chunks, { type: "video/webm" });
//       setVideoBlob(URL.createObjectURL(blob));
//     };

//     mediaRecorderRef.current.start();
//   };

//   const stopRecording = () => {
//     setRecording(false);
//     mediaRecorderRef.current.stop();
//   };

//   return (
//     <div>
//       <video src="/assets/ai-manager.mp4" controls />
      
//       <Webcam ref={webcamRef} />
//       <video ref={videoRef} autoPlay muted />

//       {!recording ? (
//         <button onClick={startRecording}>Start Recording</button>
//       ) : (
//         <button onClick={stopRecording}>Stop Recording</button>
//       )}

//       {videoBlob && (
//         <div>
//           <h3>Recorded Response:</h3>
//           <video src={videoBlob} controls />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoInteraction;



import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const VideoInteraction = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    // Request camera access when component mounts
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => setMediaStream(stream))
      .catch((err) => console.error("Error accessing webcam:", err));
  }, []);

  const startRecording = () => {
    if (!mediaStream) {
      alert("Webcam not started. Please allow camera access.");
      return;
    }

    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(mediaStream, { mimeType: "video/webm" });
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
  };

  return (
    <div>
      <video src="/assets/ai-manager.mp4" controls />

      {/* ✅ Only one webcam feed */}
      <Webcam ref={webcamRef} audio={true} />

      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {videoBlob && (
        <div>
          <h3>Recorded Response:</h3>
          <video src={videoBlob} controls />
        </div>
      )}
    </div>
  );
};

export default VideoInteraction;
