import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../App";

const VoiceControl = () => {
  const { isCam, setCam, img, setImg } = useContext(UserContext);
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const recognitionRef = useRef(null); // Reference to hold the recognition instance

  // Initialize SpeechRecognition once
  if (
    !recognitionRef.current &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  ) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);

      // Voice commands handling
      if (transcript.includes("open chat")) {
        console.log("Opening chat widget...");
        navigate("/chat", { replace: true });
      } else if (transcript.includes("go to home")) {
        console.log("Closing chat widget...");
        navigate("/", { replace: true });
      } else if (transcript.includes("please open the camera")) {
        console.log("cameara on");
        setCam(true);
        navigate("/chat", { replace: true });
      } else if (transcript.includes("logout")) {
        console.log("Logging out...");
        logout();
      } else if (transcript.includes("click")) {
        setImg((prevState) => !prevState);
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }

  const handleListen = () => {
    if (!recognitionRef.current) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        videoElement.play();

        document.body.appendChild(videoElement); // Display the video on the page
        videoElement.style.width = "300px"; // Adjust size as needed
        videoElement.style.position = "absolute"; // Position it if necessary
      })
      .catch((error) => {
        console.error("Error accessing the camera: ", error);
      });
  };

  return (
    <button
      onClick={handleListen}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded voice-control"
    >
      {isListening ? "Stop Listening" : "Start Listening"}
    </button>
  );
};

export { VoiceControl };
