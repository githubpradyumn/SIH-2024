import React, { useState, useEffect } from 'react';
import { FaSpinner, FaCircleNotch, FaCog } from 'react-icons/fa';

const icons = [
  <FaSpinner className="animate-spin text-4xl text-blue-500" />,
  <FaCircleNotch className="animate-spin text-4xl text-green-500" />,
  <FaCog className="animate-spin text-4xl text-red-500" />,
];

const Preloader = () => {
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prevIcon) => (prevIcon + 1) % icons.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      {icons[currentIcon]}
    </div>
  );
};

export default Preloader;
