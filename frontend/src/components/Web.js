import React, { useRef, useEffect, useContext, useState } from "react";
import { UserContext } from "../App";

const Web = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { isAuthenticated, isCam, setCam, setSelectedImage, img, setImg } =
    useContext(UserContext);
  const [stream, setStream] = useState(null);

  // Function to start the webcam
  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
      });
  };

  // Function to stop the webcam
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  // Function to capture image
  const captureImage = () => {
    console.log("image captured");
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], "captured_image.jpg", {
        type: "image/jpeg",
      });
      setSelectedImage(file);
    }, "image/jpeg");
  };

  useEffect(() => {
    captureImage();
  }, [img]);

  useEffect(() => {
    if (isCam) {
      startWebcam();
    }

    return () => {
      stopWebcam();
    };
  }, [isCam]);

  return (
    <div className="relative flex flex-col items-center w-full  mb-10">
      <h2>Webcam Feed</h2>
      <video
        ref={videoRef}
        style={{ width: "100%", maxWidth: "600px", border: "2px solid black" }}
      ></video>

      <div className="mt-4 flex flex-col items-center">
        {/* <button
          onClick={startWebcam}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Start Webcam
        </button>
        <button
          onClick={stopWebcam}
          className="px-4 py-2 bg-red-500 text-white rounded-lg mt-2"
        >
          Stop Webcam
        </button> */}
        <button
          onClick={captureImage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2"
        >
          Capture Image
        </button>
      </div>

      {/* Canvas element for capturing image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export { Web };
