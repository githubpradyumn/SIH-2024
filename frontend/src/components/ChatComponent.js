import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../App";
import { Web } from "./Web";

const ChatComponent = () => {
  const SERVER = process.env.REACT_APP_SERVER;
  const { isAuthenticated, isCam, setCam, selectedImage, setSelectedImage } =
    useContext(UserContext);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true); // Default to 'on'
  const recognitionRef = useRef(null);

  // Initialize SpeechRecognition (Web Speech API)
  const initSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Browser does not support the Web Speech API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set the language for transcription
    recognition.continuous = false; // Stop after a single phrase
    recognition.interimResults = false; // Only show final results

    recognition.onstart = () => {
      setRecording(true);
      setInputValue("Recording..."); // Display while recording
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript); // Set the transcribed text in textarea

      const newMessage = { type: "sent", content: transcript };
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setRecording(false); // Stop recording
    };

    recognitionRef.current = recognition;
  };

  const startRecording = () => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    recognitionRef.current.start(); // Start recognition
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop recognition
    }
  };

  const handleTextChange = (e) => setInputValue(e.target.value);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Text-to-Speech (TTS) Function
  const speakText = (text) => {
    if (audioEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle sending text message
  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessage = { type: "sent", content: inputValue };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await fetch(`${SERVER}/text`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputValue }),
        });

        const data = await response.json();
        const responseMessage = { type: "received", content: data.info };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);

        if (audioEnabled) speakText(data.info); // Speak the response if audio is enabled
        setInputValue(""); // Reset the text input after sending
      } catch (error) {
        console.error("Error uploading text:", error);
      }
    }

    // Send file if present
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${SERVER}/text`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const fileUrl = URL.createObjectURL(file);
        const fileMessage = {
          type: "sent",
          content: (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          ),
        };
        setMessages((prevMessages) => [...prevMessages, fileMessage]);

        if (audioEnabled) speakText(data.text); // Speak the response if audio is enabled
        setSelectedImage(null); // Reset after sending the file
        fileInputRef.current.value = ""; // Clear file input
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Handle sending image
  const handleSendImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      // Display the image in chat as sent by user
      const imageUrl = URL.createObjectURL(selectedImage);
      const imageMessage = {
        type: "sent",
        content: <img src={imageUrl} alt="Sent" className="w-32 h-32" />,
      };
      setMessages((prevMessages) => [...prevMessages, imageMessage]);

      try {
        const response = await fetch(`${SERVER}/img`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const responseMessage = { type: "received", content: data.text };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);

        if (audioEnabled) speakText(data.text); // Speak the response if audio is enabled
        setSelectedImage(null); // Reset after sending the image
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full h-[calc(100vh-4rem)]">
      {isAuthenticated ? (
        <>
          {isCam ? (
            <Web />
          ) : (
            <>
              <div className="flex flex-col w-full max-w-xl bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.type === "sent" ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        msg.type === "sent"
                          ? "bg-white text-red-500"
                          : "bg-gray-300 text-red-500"
                      } max-w-xs`}
                    >
                      {msg.content}
                      {/* Add speaker button */}
                      {typeof msg.content === "string" && (
                        <button
                          className="ml-2 text-blue-500"
                          onClick={() => speakText(msg.content)}
                        >
                          🔊
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <textarea
                value={inputValue}
                onChange={handleTextChange}
                placeholder="Type your message..."
                className="p-2 rounded-lg bg-gray-100 w-full max-w-xl mt-4 text-red-500 mb-6"
              />
            </>
          )}

          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={startRecording}
                disabled={recording}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  recording ? "bg-gray-500" : "bg-green-500"
                }`}
              >
                Start Recording
              </button>
              <button
                hidden
                onClick={stopRecording}
                disabled={!recording}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  !recording ? "bg-gray-500" : "bg-red-500"
                }`}
              >
                Stop Recording
              </button>
              <button
                onClick={() => setCam(!isCam)}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  isCam ? "bg-gray-500" : "bg-red-500"
                }`}
              >
                {isCam ? "Chat" : "Camera"}
              </button>
              <button
                onClick={() => {
                  setAudioEnabled(!audioEnabled);
                  window.speechSynthesis.cancel(); // Stop any ongoing speech
                }}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  audioEnabled ? "bg-blue-500" : "bg-gray-500"
                }`}
              >
                {audioEnabled ? "Audio On" : "Audio Off"}
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send Text
              </button>
              <button
                onClick={handleSendImage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send Image
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, .pdf, .doc, .docx"
                className={`mt-2 ${isCam ? "hidden" : ""}`}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </>
      ) : (
        <h1>Please login first</h1>
      )}
    </div>
  );
};

export default ChatComponent;
